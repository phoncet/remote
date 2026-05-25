import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function ProtectedAdminRoute({ children }) {
  const { currentUser } = useUser();

  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
