import express from 'express';
import jwt from 'jsonwebtoken';
import { auth, db } from '../config/firebase.js';
import { authenticateToken } from '../middleware/auth.js';

// Check if Firebase is initialized
const isFirebaseInitialized = () => {
  try {
    return auth && db;
  } catch (error) {
    return false;
  }
};

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  console.error('❌ ERROR: JWT_SECRET is not set in environment variables');
  console.error('Please set JWT_SECRET in your .env file');
  process.exit(1);
}

/**
 * POST /api/auth/send-otp
 * Send OTP to phone number using Firebase Phone Authentication
 */
router.post('/send-otp', async (req, res) => {
  try {
    if (!isFirebaseInitialized()) {
      return res.status(500).json({ error: 'Firebase is not configured. Please check your environment variables.' });
    }

    const { phoneNumber } = req.body;

    if (!phoneNumber || typeof phoneNumber !== 'string') {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Note: This endpoint is deprecated - Firebase Phone Auth handles OTP on client-side
    // Keeping for backward compatibility
    res.status(410).json({ 
      error: 'This endpoint is deprecated. Please use Firebase Phone Authentication on the client-side.' 
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: 'An error occurred while sending OTP' });
  }
});

/**
 * POST /api/auth/verify-otp
 * DEPRECATED: Use Firebase Phone Authentication instead
 */
router.post('/verify-otp', async (req, res) => {
  res.status(410).json({ 
    error: 'This endpoint is deprecated. Please use Firebase Phone Authentication on the client-side.' 
  });
});

/**
 * POST /api/auth/refresh
 * Refresh JWT token
 */
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    if (!isFirebaseInitialized()) {
      return res.status(500).json({ error: 'Firebase is not configured. Please check your environment variables.' });
    }

    const { userId, phone } = req.user;

    // Verify user still exists
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate new token
    const token = jwt.sign(
      {
        userId,
        phone,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ error: 'An error occurred while refreshing token' });
  }
});

/**
 * GET /api/auth/me
 * Get current user information
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    if (!isFirebaseInitialized()) {
      return res.status(500).json({ error: 'Firebase is not configured. Please check your environment variables.' });
    }

    const { userId } = req.user;

    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();

    res.json({
      success: true,
      user: {
        userId,
        phone: userData.phone,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
        lastLogin: userData.lastLogin,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});

/**
 * POST /api/auth/verify-firebase-token
 * Verify Firebase ID token and create JWT token
 */
router.post('/verify-firebase-token', async (req, res) => {
  try {
    if (!isFirebaseInitialized()) {
      return res.status(500).json({ error: 'Firebase is not configured. Please check your environment variables.' });
    }

    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'Firebase ID token is required' });
    }

    try {
      // Verify Firebase ID token
      const decodedToken = await auth.verifyIdToken(idToken);
      const phoneNumber = decodedToken.phone_number;

      if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number not found in Firebase token' });
      }

      // Normalize phone number
      const normalizedPhone = phoneNumber.replace(/\s/g, '');

      // Create or update user in Firestore
      const userRef = db.collection('users').doc(normalizedPhone);
      const userDoc = await userRef.get();

      const now = new Date();
      let userId;

      if (userDoc.exists) {
        // Update existing user
        await userRef.update({
          updatedAt: now,
          lastLogin: now,
          firebaseUid: decodedToken.uid,
        });
        userId = normalizedPhone;
      } else {
        // Create new user
        await userRef.set({
          phone: normalizedPhone,
          firebaseUid: decodedToken.uid,
          createdAt: now,
          updatedAt: now,
          lastLogin: now,
        });
        userId = normalizedPhone;
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: userId,
          phone: normalizedPhone,
          firebaseUid: decodedToken.uid,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Get user data
      const userData = (await userRef.get()).data();

      res.json({
        success: true,
        token,
        user: {
          userId,
          phone: normalizedPhone,
          createdAt: userData.createdAt,
          lastLogin: userData.lastLogin,
        },
      });
    } catch (error) {
      console.error('Firebase token verification error:', error);
      return res.status(401).json({ error: 'Invalid Firebase token' });
    }
  } catch (error) {
    console.error('Verify Firebase token error:', error);
    res.status(500).json({ error: 'An error occurred while verifying Firebase token' });
  }
});

/**
 * POST /api/auth/logout
 * Logout (client-side token removal, server can optionally blacklist)
 */
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // In a more advanced setup, you could blacklist tokens here
    // For now, client-side removal is sufficient
    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'An error occurred while logging out' });
  }
});

export { router as authRouter };

