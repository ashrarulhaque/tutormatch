import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner'; 
import { useAuth } from '../contexts/AuthContext';
import { useFlashMessage } from '../contexts/FlashMessageContext';

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: ('Teacher' | 'Student')[];
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { showFlash } = useFlashMessage();

  useEffect(() => {
    if (!isLoading && !user) {
      showFlash("Please login to open this page", "error");
      navigate("/login");
    }
  }, [user, isLoading, navigate, showFlash]);

  if (isLoading) return <LoadingSpinner />;

   // if (allowedRoles && !allowedRoles.includes(user.role)) {
  //   // Optional: redirect to a role-based dashboard or error page
  //   return <Navigate to={/${user.role.toLowerCase()}/dashboard} replace />;
  // }
  if (!user) return null; // Avoid rendering children before redirect

  return <>{children}</>;
};

export default PrivateRoute;
