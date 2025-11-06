import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-bold text-foreground">Page Not Found</h2>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/">
            <Button size="lg" variant="premium">
              Back to Home
            </Button>
          </Link>
          <Link to="/shop">
            <Button size="lg" variant="outline-premium">
              Visit Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
