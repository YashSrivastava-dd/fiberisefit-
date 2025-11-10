import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginModal } from '@/components/auth/LoginModal';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <LoginModal
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              const from = (location.state as any)?.from?.pathname || '/';
              navigate(from, { replace: true });
            }
          }}
        />
      </div>
    </div>
  );
};

export default Login;

