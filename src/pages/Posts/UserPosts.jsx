import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPosts } from "../../Components/PostRequestsFirebase";
import { useNavigate } from "react-router-dom";
import MapingPosts from "../../Components/MappingPosts/MappingPosts";

export default function UserPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const { list: posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const userPosts = posts.filter((post) => post.Auther === user?.fullName);

  const handleEdit = (post) => {
    navigate(`/edit/${post.id}`);
  };
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this post ?");
    if (confirmDelete) dispatch(deletePost(id));
  };

  return (
    <div>
      {userPosts.length !== 0 && <h2 className="pagetitle">Your Posts</h2>}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {userPosts.length === 0 && (
        <>
          <p className="no-posts">
            You have no posts yet. Publish your passions and ideas, That is your
            way
          </p>
          <button className="create-post" onClick={() => navigate(`/new-post`)}>
            {" "}
            Create Your First Post
          </button>
        </>
      )}
      <MapingPosts
        userPosts={userPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
