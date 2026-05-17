import { Navigate } from "react-router-dom";

function RecruiterRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Not recruiter
  if (role !== "recruiter") {
    return <Navigate to="/jobs" replace />;
  }

  return children;
}

export default RecruiterRoute;