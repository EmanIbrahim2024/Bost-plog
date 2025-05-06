import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { deletePost, getPosts } from "../../redux/postSlice";
import { deletePost, getPosts } from '../../Components/PostRequestsFirebase';
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../Components";
import {MapingPosts} from "../../Components";


export default function Posts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.list);
  const { loading, error } = useSelector((state) => state.posts);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  ////////////pagination//////////
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  ////////////////////////////////

  const handleEdit = (post) => {
    navigate(`/edit/${post.id}`);
  };

  const handleDelete = (id) =>{
    const confirmDelete=window.confirm("Are you sure to delete this post ?")
    if(confirmDelete) dispatch(deletePost(id));
  }

  return (
    <>
      <h2 className="pagetitle">All Posts</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <MapingPosts userPosts={currentPosts} handleEdit={handleEdit} handleDelete={handleDelete}/>
      

      {/* <ul>
        {currentPosts.map((post) => (
          <li key={post.id}className="all-posts-cont">
            <div className="post-Container">
              <strong>
                <p className="post-title">{post.title}</p>
              </strong>
              <h2 className="post-content">{post.content}</h2>
            </div>

            <div className="bottompost">
              <div className="button-Container">
                <button onClick={() => dispatch(deletePost(post.id))}>
                  Delete
                </button>
                <button onClick={() => handleEdit(post)}>Edit</button>
              </div>
              <div className="dateAuther-container">
                <p className="auther-name">By: You</p>
                <p className="date">
                  Posted{" "}
                  {formatDistanceToNow(new Date(post.timestamp), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul> */}

      <Pagination
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
}
