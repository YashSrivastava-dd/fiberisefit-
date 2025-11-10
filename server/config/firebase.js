import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from server directory
dotenv.config({ path: join(__dirname, '..', '.env') });

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    // Option 1: Using service account JSON file path
    if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
      const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH.startsWith('/')
        ? process.env.FIREBASE_SERVICE_ACCOUNT_PATH
        : join(__dirname, '..', '..', process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
      const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    // Option 2: Using individual environment variables
    else if (
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_PRIVATE_KEY &&
      process.env.FIREBASE_CLIENT_EMAIL
    ) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      });
    }
    // Option 3: Using service account JSON as string
    else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('⚠️ Firebase Admin SDK not initialized - missing credentials');
        console.warn('Set FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL or FIREBASE_SERVICE_ACCOUNT_PATH');
      }
    }
  } catch (error) {
    console.error('❌ Error initializing Firebase Admin SDK:', error.message);
  }
}

// Export Firebase services only if initialized
let auth = null;
let db = null;

try {
  if (admin.apps.length > 0) {
    auth = admin.auth();
    db = admin.firestore();
    if (process.env.NODE_ENV !== 'production') {
      console.log('✅ Firebase Admin SDK initialized successfully');
    }
  } else {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('⚠️ Firebase Admin SDK not initialized - auth features will be limited');
    }
  }
} catch (error) {
  console.error('❌ Firebase Admin SDK initialization failed:', error.message);
}

export { auth, db };
export default admin;

