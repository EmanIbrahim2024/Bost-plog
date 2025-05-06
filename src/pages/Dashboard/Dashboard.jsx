import "./dashboard.css";
import UserPosts from "../Posts/UserPosts";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="userInfo">
        <h2 className="welcomed">
          Welcome, <span className="Name"> {user.fullName} </span>{" "}
        </h2>

        <div>
          <p className="userMail">Email: {user.email}</p>
          <p className="userPass">Phone: {user.phone}</p>
        </div>
      </div>
      <UserPosts />
    </>
  );
}
