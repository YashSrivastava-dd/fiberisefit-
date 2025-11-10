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

    // Basic phone validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const normalizedPhone = phoneNumber.replace(/\s/g, '');
    
    if (!phoneRegex.test(normalizedPhone)) {
      setError('Please enter a valid phone number');
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
      const normalizedPhone = phoneNumber.replace(/\s/g, '');
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

  const handleClose = () => {
    onOpenChange(false);
    // Reset form after a delay to allow animation
    setTimeout(() => {
      setStep('phone');
      setPhoneNumber('');
      setOtp('');
      setError('');
    }, 200);
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
                <Input
                  type="tel"
                  placeholder="+1234567890"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
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
                  Code sent to: {phoneNumber}
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

