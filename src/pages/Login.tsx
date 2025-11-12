import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginModal } from '@/components/auth/LoginModal';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleModalChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open && !isAuthenticated) {
      // If modal is closed and user is not authenticated, navigate to home
      // If user authenticates successfully, the useEffect will handle redirect
      navigate('/', { replace: true });
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <LoginModal
          open={isModalOpen}
          onOpenChange={handleModalChange}
        />
      </div>
    </div>
  );
};

export default Login;

