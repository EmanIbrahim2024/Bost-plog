import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../Components/PostRequestsFirebase";
import { useNavigate } from "react-router-dom";

import { PostForm } from "../../Components";

export default function NewPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  // const Auther= {user?.displayName || user?.fullName || "User"}


  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      setErrorMessage("Please fill in both title and content.");
      return;
    }

    const newPost = {
      title,
      content,
      image,
      timestamp: new Date().toLocaleString(),
      Auther: user.fullName
    };

    dispatch(addPost(newPost));
    navigate("/posts");
  };

  return (
    <div className="newpost-container">
      <h2 className="pagetitle">Add New Post</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
