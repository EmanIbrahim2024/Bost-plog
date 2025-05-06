import { Navigate } from "react-router-dom";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) return <Navigate to="/dashboard" />;
  return <Navigate to="/login" />;
}
