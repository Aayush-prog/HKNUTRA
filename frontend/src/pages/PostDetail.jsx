import { React, useState, useEffect } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { useParams } from "react-router";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get(`${api}/post/${id}`);
        if (res.status === 200) {
          setPost(res.data.data);
          setError(null);
        } else {
          setError(res.data.message);
          setPost(null);
        }
      } catch (err) {
        console.error("Error fetching post data:", err);
        setError("An error occurred while fetching post data.");
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id, api]);
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

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-8">
        <p>Event not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mb-10">
      <img
        src={`${api}/images/${post.image}`}
        alt={post.title}
        className="w-full h-[75vh] object-cover mb-4"
      />
      <h2 className="text-3xl font-bold text-center mb-4">{post.title}</h2>

      <div className="flex flex-col md:flex-row justify-evenly lg:items-center mb-4 px-8">
        <div className="flex items-center gap-2 text-lg text-gray-700">
          <FaCalendar />
          <p>{formatDateToWord(post.createdAt)}</p>
        </div>
      </div>
      <div className="prose lg:prose-xl mx-auto flex items-center justify-center px-8">
        <p>{post.body}</p>
      </div>
    </div>
  );
}
