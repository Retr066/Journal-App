import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  isAuth: boolean;
  children: JSX.Element;
}
export const PublicRoute = ({ isAuth, children }: PrivateRouteProps) => {
  return isAuth ? <Navigate to="/" /> : children;
};
