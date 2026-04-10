import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "@/redux/ReduxStore";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (!token || !user) {
      toast.error("Access Denied! Please login first.", {
        toastId: "login-required",
      });
    } else if (user && !allowedRoles.includes(user.role)) {
      toast.warning("Unauthorized! You don't have permission.", {
        toastId: "unauthorized-access",
      });
    }
  }, [token, user, allowedRoles]);

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
