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

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Unauthorized access</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            NEWS DASHBOARD
          </h1>
          <div className="mt-4 space-y-1">
            <p className="text-lg text-gray-600">
              Welcome,{" "}
              <span className="font-semibold">
                {user ? user.name : "Guest"}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              You have the role:{" "}
              <span className="font-medium text-blue-600">Admin</span>
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Form Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editPostId ? "Edit News" : "Write News About LESTO"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Create and publish news articles for the LESTO project
              </p>
            </div>

            <form
              onSubmit={editPostId ? handleUpdatePost : handleNewsSubmit}
              className="space-y-6"
            >
              {/* Title Input */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <cds-icon
                    shape="contract"
                    size="lg"
                    className="mr-2"
                  ></cds-icon>
                  News Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  placeholder="Enter news title"
                />
              </div>

              {/* Content Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  News Content
                </label>
                <div className="prose max-w-none">
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
                    placeholder="Write your news content here..."
                    className="bg-white rounded-md"
                    style={{ minHeight: "200px" }}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  News Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition duration-150 ease-in-out">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={(e) => setImage(e.target.files[0])}
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    {image && (
                      <p className="text-sm text-green-600 mt-2">
                        Selected: {image.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  {editPostId ? "Update News Post" : "Publish News Post"}
                </button>
              </div>
            </form>
          </div>

          {/* News List Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent News Posts
            </h2>
            <div className="space-y-6">
              {posts.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No news posts available
                </p>
              ) : (
                posts.map((post) => (
                  <div
                    key={post._id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-150 ease-in-out"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {post.title}
                        </h3>
                        <div
                          className="prose max-w-none text-gray-600 mb-4"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                        <p className="text-sm text-gray-500">
                          Author:{" "}
                          <span className="font-medium">{post.author}</span>
                        </p>
                      </div>
                      {post.image && (
                        <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full sm:w-48 h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
