import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

export default function Protected({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
