import { Navigate, Outlet, useLocation } from "react-router-dom";
import { tokens } from "../../lib/api";

// Pages behind the sign-in: without a token go to /login and come back after.
export default function RequireAuth() {
  const location = useLocation();
  if (!tokens.access) {
    const returnTo = location.pathname + location.search;
    return <Navigate to={`/login?returnTo=${encodeURIComponent(returnTo)}`} replace />;
  }
  return <Outlet />;
}
