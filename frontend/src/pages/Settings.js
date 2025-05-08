import React, { useState, useEffect, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Settings.css";
import "@cds/core/icon/register.js";
import "@cds/core/button/register.js";
import { ClarityIcons, contractIcon } from "@cds/core/icon";
import { useNavigate } from "react-router-dom";

ClarityIcons.addIcons(contractIcon);

const Dashboard = () => {
  const { user, getAccessTokenSilently, isAuthenticated, loginWithRedirect } =
    useAuth0();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  // New state for preview URL
  const [previewUrl, setPreviewUrl] = useState("");
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
  }, [posts, currentPage]);

  const allowedEmails = useMemo(
    () => ({
      "tretegan@chalmers.se": "Teodora Retegan Vollmer",
      "simone.gianfelici@enea.it": "Simone Gianfelici",
      "t.spare.jkpg@gmail.com": "Thomas Spåre",
    }),
    []
  );

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect();
      } else {
        setIsAuthenticatedState(true);
      }
    };
    checkAuthentication();
  }, [isAuthenticated, loginWithRedirect]);

  useEffect(() => {
    if (isAuthenticatedState) {
      if (user && user.email in allowedEmails) {
        setIsAuthorized(true);
        fetchLastThreePosts();
      } else {
        setIsAuthorized(false);
        navigate("/unauthorized");
      }
    }
  }, [isAuthenticatedState, user, navigate, allowedEmails]);

  const fetchLastThreePosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/news`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !image) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("author", allowedEmails[user.email]);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/news`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("News article added successfully");
      setTitle("");
      setContent("");
      setImage(null);
      fetchLastThreePosts();
    } catch (error) {
      console.error("Error adding news article:", error);
      alert("Failed to add news article");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/news/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Post deleted successfully");
      fetchLastThreePosts();
    } catch (error) {
      alert("Failed to delete post");
    }
  };

  const handleEditPost = (post) => {
    setEditPostId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setAuthor(post.author);
    setImage(null);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    formData.append("author", user.name);

    try {
      const token = await getAccessTokenSilently();
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/news/${editPostId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Post updated successfully");
      setTitle("");
      setContent("");
      setImage(null);
      setEditPostId(null);
      fetchLastThreePosts();
    } catch (error) {
      alert("Failed to update post");
    }
  };

  if (!isAuthorized) {
    return <div>Unauthorized access</div>;
  }

  const handleNextPage = () => {
    if (currentPage * postsPerPage < posts.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className={`Settings ${previewUrl ? "with-preview" : ""}`}>
      <div className="status">
        <p>Welcome, {user ? user.name : "Guest"}</p>
        <p>You have admin access and can post news for LESTO</p>
      </div>
      <div>
        <div className="news-form">
          <h2>{editPostId ? "Edit News" : "News Form"}</h2>
          <form onSubmit={editPostId ? handleUpdatePost : handleNewsSubmit}>
            <div>
              <label style={{ padding: "20px", color: "black" }}>
                <cds-icon shape="contract" size="lg"></cds-icon>
                &nbsp;&nbsp;&nbsp;&nbsp; News Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image", "video"],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "font",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "indent",
                  "link",
                  "image",
                  "video",
                ]}
                placeholder="News Content"
              />
            </div>
            <div>
              <label>News Image or Video</label>
              <input
                style={{ padding: "20px", borderRadius: "20px" }}
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  setPreviewUrl(URL.createObjectURL(file));
                }}
              />
            </div>
            {previewUrl &&
              image &&
              (image.type.startsWith("video/") ? (
                <video src={previewUrl} controls style={{ maxWidth: "100%" }} />
              ) : (
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{ maxHeight: "40%" }}
                />
              ))}
            <button
              type="submit"
              style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "deepskyblue",
                color: "blue",
                borderRadius: "5px",
              }}
            >
              {editPostId ? "Update News Post" : "Add News Post"}
            </button>
          </form>
        </div>
        <div className="news-list">
          <h2 style={{ marginBottom: "20px" }}>News Posts</h2>
          {paginatedPosts.map((post) => (
            <div key={post._id} className="news-item">
              <h3>{post.title}</h3>
              <div
                className="news-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              {post.image && <img src={post.image} alt={post.title} />}
              <p>
                Publishing Date:{" "}
                {new Date(post.upload_date).toLocaleDateString()}
              </p>
              <p style={{ marginBottom: "20px" }}>Author: {post.author}</p>
              <button
                onClick={() => handleEditPost(post)}
                style={{ color: "blue", marginRight: "30px" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                style={{ color: "blue" }}
              >
                Delete
              </button>
            </div>
          ))}
          <div className="pagination-controls">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              style={{ marginRight: "30px", color: "deepskyblue" }}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage * postsPerPage >= posts.length}
              style={{ color: "deepskyblue" }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
