import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

export default function Posts() {
  const api = import.meta.env.VITE_URL;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

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

  const handleClick = (eventId) => {
    navigate(`/community/${eventId}`);
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

  if (loading) return <Loading />;

  let displayedPosts;
  if (showAll) {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    displayedPosts = posts.slice(startIndex, endIndex);
  } else {
    displayedPosts = posts.slice(0, 2);
  }

  return (
    <div className="p-4 md:p-8 lg:p-20">
      {error && <p className="text-red-500">{error}</p>}
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
              <div className="relative z-10 p-4 text-white flex flex-col justify-between h-full">
                <div>
                  <p className="text-green-400 font-bold text-xl">
                    {post.location}
                  </p>
                  <h3 className="font-extrabold text-xl sm:text-2xl">
                    {post.title}
                  </h3>{" "}
                </div>
                <div className="items-center space-x-2 text-sm">
                  <p>Post Date:</p>
                  <p>{formatDateToWord(post.createdAt)}</p>
                  <button
                    onClick={() => handleClick(post._id)}
                    className="mt-2 p-2 inline-flex items-center hover:underline rounded bg-gray-800"
                  >
                    <p>Post Details</p>
                    <MdArrowOutward className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {showAll && posts.length > postsPerPage && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      {!showAll && posts.length > 2 && (
        <div className="flex justify-center">
          <button
            onClick={handleExpand}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            See All
          </button>
        </div>
      )}
      {showAll && posts.length > 2 && (
        <div className="flex justify-center">
          <button
            onClick={handleExpand}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
}
