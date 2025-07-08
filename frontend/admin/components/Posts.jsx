import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

export default function Posts() {
  const api = import.meta.env.VITE_URL;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/post`);
      if (response.status === 200) {
        setPosts(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (showAll) {
      setTotalPages(Math.ceil(posts.length / postsPerPage));
      setCurrentPage(1);
    }
  }, [posts, showAll]);

  const handleClick = (postId) => {
    navigate(`/admin/community/${postId}`);
  };

  const handleExpand = () => {
    setShowAll(!showAll);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  function formatDateToWord(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewPost((prevPost) => ({
      ...prevPost,
      image: file,
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", newPost.title);
      formData.append("body", newPost.body);
      formData.append("image", newPost.image);

      const response = await axios.post(`${api}/post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 201) {
        alert("success");
        fetchPosts();
        setShowAddPostForm(false);
        setNewPost({ title: "", body: "", image: null });
        setImagePreview(null);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAddPostForm = () => {
    setShowAddPostForm(!showAddPostForm);
    setNewPost({ title: "", body: "", image: null });
    setImagePreview(null);
    setError(null);
  };

  const PostDisplay = () => {
    let displayedPosts;
    if (showAll) {
      const startIndex = (currentPage - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      displayedPosts = posts.slice(startIndex, endIndex);
    } else {
      displayedPosts = posts.slice(0, 2);
    }
    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 items-center mx-auto w-full lg:w-3/4 ">
        {posts.length == 0 && <div> No posts to display</div>}
        {posts.length > 0 &&
          displayedPosts.map((post) => (
            <div
              key={post._id}
              className="relative mb-4 rounded-2xl overflow-hidden group h-[300px] sm:h-[350px] md:h-[400px]"
            >
              <img
                src={`${api}/images/${post.image}`}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500"></div>
              <div className="relative z-10 p-5 text-white flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl">
                    {post.title}
                  </h3>
                </div>
                <div className="items-center space-x-2 text-sm">
                  <p>Post Date:</p>
                  <p>{formatDateToWord(post.createdAt)}</p>
                  <button
                    onClick={() => handleClick(post._id)}
                    className="mt-2 p-2 inline-flex items-center hover:underline rounded bg-green-500 hover:bg-green-600 "
                  >
                    <p>Post Details</p>
                    <MdArrowOutward className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  };

  const PaginationControls = () => {
    return (
      showAll &&
      posts.length > postsPerPage && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )
    );
  };

  const ShowMoreLessButtons = () => {
    return (
      <>
        {!showAll && posts.length > 2 && (
          <div className="flex justify-center">
            <button
              onClick={handleExpand}
              className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-green-6000"
            >
              See All
            </button>
          </div>
        )}
        {showAll && posts.length > 2 && (
          <div className="flex justify-center">
            <button
              onClick={handleExpand}
              className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-green-600"
            >
              Show Less
            </button>
          </div>
        )}
      </>
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4 md:p-8 lg:p-20">
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleAddPostForm}
          className="px-6 py-2 bg-primary text-white rounded hover:bg-green-600"
        >
          {showAddPostForm ? "Hide Form" : "Add Post"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {showAddPostForm ? (
        <div className="bg-white rounded-lg p-8 w-full max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
          <form
            onSubmit={handleSubmit}
            className="md:flex md:flex-wrap md:justify-between"
          >
            <div className="mb-4 md:w-1/2 md:pr-2">
              <label
                htmlFor="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4 md:w-full">
              <label
                htmlFor="body"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Body:
              </label>
              <textarea
                id="body"
                name="body"
                value={newPost.body}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-4 md:w-full">
              <label
                htmlFor="image"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 max-h-40"
                />
              )}
            </div>
            <div className="flex justify-end md:w-full">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                onClick={toggleAddPostForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <PostDisplay />
          <PaginationControls />
          <ShowMoreLessButtons />
        </>
      )}
    </div>
  );
}
