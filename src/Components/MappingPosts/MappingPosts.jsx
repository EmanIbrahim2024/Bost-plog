import { formatDistanceToNow } from "date-fns";
import "./mapping.css";


export default function MapingPosts({ userPosts, handleEdit, handleDelete }) {
  const user = JSON.parse(localStorage.getItem("user"));
  

  return (
    <>
      <ul>
        {userPosts.map((post) => (
          <li key={post.id} className="user-posts-cont">
            <div className="post-Container">
              <p className="post-title">
                <strong>{post.title}</strong>
              </p>
              <div className="post-content">{post.content}</div>
            </div>
            <div className="bottompost">
              <div className="button-Container">
                <button onClick={() => handleDelete(post.id)}>Delete</button>
                <button onClick={() => handleEdit(post)}>Edit</button>
              </div>
              <div className="dateAuther-container">
                <p className="auther-name">
                  By: {post.Auther === user.fullName ? "You" : `${post.Auther}`}{" "}
                </p>
                <p className="date">
                  {" "}
                  {formatDistanceToNow(new Date(post.timestamp), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

