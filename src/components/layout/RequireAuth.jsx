import { Navigate, Outlet, useLocation } from "react-router-dom";
import { loginNotice, SESSION_ENDED, tokens } from "../../lib/api";
import SessionGuard from "./SessionGuard";

// Pages behind the sign-in: without a token (or after the session's end) go to /login and come back after.
export default function RequireAuth() {
  const location = useLocation();
  if (!tokens.valid()) {
    // A token left over from an ended session is dropped, with the reason shown on the sign-in page.
    if (tokens.access) {
      tokens.clear();
      loginNotice.set(SESSION_ENDED);
    }
    const returnTo = location.pathname + location.search;
    return <Navigate to={`/login?returnTo=${encodeURIComponent(returnTo)}`} replace />;
  }
  return (
    <>
      <SessionGuard />
      <Outlet />
    </>
  );
}
