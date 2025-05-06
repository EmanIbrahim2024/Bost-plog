import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  editPost,
  getCertainPost,
} from "../../Components/PostRequestsFirebase";

import { PostForm } from "../../Components";

function PostDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { SelectedPost, loading, error } = useSelector((state) => state.posts);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch post once using Redux
  useEffect(() => {
    dispatch(getCertainPost(id));
  }, [dispatch, id]);

  // Populate form when post is loaded
  useEffect(() => {
    if (SelectedPost) {
      setTitle(SelectedPost.title);
      setContent(SelectedPost.content);
    }
  }, [SelectedPost]);

  const handleSubmit = () => {
    if (!title || !content) {
      setErrorMessage("Title and content cannot be empty!");
      return;
    }
    dispatch(
      editPost({
        id,
        updatedPost: {
          title,
          content,
          timestamp: new Date().toLocaleString(),
        },
      })
    );
    navigate("/posts");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="post-details-container">
      <h2 className="pagetitle">Edit Post</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <PostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleSubmit={handleSubmit}
        SelectedPost={SelectedPost}
      />
    </div>
  );
}

export default PostDetails;
