import { Header } from "../../Components/index";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

if (user) return <Navigate to='/dashboard'/>
return <Navigate to='/login'/>


}
