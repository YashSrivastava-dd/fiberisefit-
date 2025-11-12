import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Helper function to normalize phone number with +91 prefix
const normalizePhoneNumber = (phone: string): string => {
  // Remove all spaces
  let cleaned = phone.replace(/\s/g, '');
  
  // Remove any non-digit characters (user might paste something with + or other chars)
  cleaned = cleaned.replace(/\D/g, '');
  
  // If it starts with 91, remove it (to avoid +9191...)
  if (cleaned.startsWith('91') && cleaned.length > 10) {
    cleaned = cleaned.substring(2);
  }
  
  // If it starts with 0, remove it
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  
  // Add +91 prefix
  return '+91' + cleaned;
};

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const { sendOTP, verifyOTP } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) {
      setError('Please enter a phone number');
      return;
    }

    // Normalize phone number with +91 prefix if needed
    const normalizedPhone = normalizePhoneNumber(phoneNumber);
    
    // Validate Indian phone number format: +91 followed by 10 digits
    // Indian mobile numbers start with 6, 7, 8, or 9
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    
    if (!phoneRegex.test(normalizedPhone)) {
      setError('Please enter a valid 10-digit Indian phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await sendOTP(normalizedPhone);
      setStep('otp');
      toast({
        title: 'OTP Sent',
        description: 'Please check your phone for the OTP code.',
      });
    } catch (err: any) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Send OTP error:', err);
      }
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim() || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const normalizedPhone = normalizePhoneNumber(phoneNumber);
      await verifyOTP(normalizedPhone, otp);
      toast({
        title: 'Login Successful',
        description: 'You have been logged in successfully.',
      });
      onOpenChange(false);
      // Reset form
      setPhoneNumber('');
      setOtp('');
      setStep('phone');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep('phone');
    setOtp('');
    setError('');
  };

  const handleClose = (open: boolean) => {
    // Update parent state
    onOpenChange(open);
    // Reset form when closing
    if (!open) {
      setTimeout(() => {
        setStep('phone');
        setPhoneNumber('');
        setOtp('');
        setError('');
      }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 'phone' ? 'Login with Phone Number' : 'Enter OTP'}
          </DialogTitle>
          <DialogDescription>
            {step === 'phone'
              ? 'Enter your phone number to receive an OTP code'
              : 'Enter the 6-digit code sent to your phone'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {step === 'phone' ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-medium">+91</span>
                  <Input
                    type="tel"
                    placeholder="9876543210"
                    value={phoneNumber}
                    onChange={(e) => {
                      // Only allow digits and spaces
                      const value = e.target.value.replace(/[^\d\s]/g, '');
                      setPhoneNumber(value);
                      setError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendOTP();
                      }
                    }}
                    disabled={loading}
                    className={error ? 'border-destructive' : ''}
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive mt-1">{error}</p>
                )}
              </div>
              <Button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full"
                variant="premium"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Code sent to: {normalizePhoneNumber(phoneNumber)}
                </p>
                <Input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(value);
                    setError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleVerifyOTP();
                    }
                  }}
                  disabled={loading}
                  maxLength={6}
                  className={`text-center text-2xl tracking-widest ${error ? 'border-destructive' : ''}`}
                />
                {error && (
                  <p className="text-sm text-destructive mt-1">{error}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleBack}
                  disabled={loading}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleVerifyOTP}
                  disabled={loading || otp.length !== 6}
                  className="flex-1"
                  variant="premium"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </Button>
              </div>
              <Button
                onClick={handleSendOTP}
                disabled={loading}
                variant="ghost"
                className="w-full text-sm"
              >
                Resend OTP
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

