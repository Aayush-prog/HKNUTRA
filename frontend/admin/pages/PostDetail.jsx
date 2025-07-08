import { React, useState, useEffect } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = import.meta.env.VITE_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/post/${id}`);
        if (res.status === 200) {
          setPost(res.data.data);
          setEditedPost({ ...res.data.data });
          setImagePreview(`${api}/images/${res.data.data.image}`);
          setError(null);
        } else {
          setError(res.data.message);
          setPost(null);
          setEditedPost(null);
          setImagePreview(null);
        }
      } catch (err) {
        console.error("Error fetching post data:", err);
        setError("An error occurred while fetching post data.");
        setPost(null);
        setEditedPost(null);
        setImagePreview(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id, api]);

  const formatDateToWord = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost({
      ...editedPost,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedPost((prevPost) => ({
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
      setImagePreview(post ? `${api}/images/${post.image}` : null);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", editedPost.title);
      formData.append("body", editedPost.body);
      if (editedPost.image && typeof editedPost.image !== "string") {
        formData.append("image", editedPost.image);
      }

      const response = await axios.put(`${api}/post/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setPost({ ...editedPost });
        setImagePreview(
          editedPost.image && typeof editedPost.image !== "string"
            ? URL.createObjectURL(editedPost.image)
            : `${api}/images/${editedPost.image}`
        );
        setError(null);
        setIsEditing(false);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Error updating post:", err);
      setError("Failed to update post.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        setLoading(true);
        const response = await axios.delete(`${api}/post/${id}`);
        if (response.status === 200) {
          alert("Post deleted successfully.");
          navigate("/admin/posts");
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error("Error deleting post:", err);
        setError("Failed to delete post.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedPost({ ...post });
    setImagePreview(`${api}/images/${post.image}`);
  };

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
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mb-10">
      <div className="relative">
        <img
          src={imagePreview}
          alt={post.title}
          className="w-full h-[75vh] object-cover mb-4"
        />
        {!isEditing && (
          <div className="absolute top-4 right-4 flex">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              <MdEdit className="inline-block mr-1" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <MdDelete className="inline-block mr-1" />
              Delete
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="w-full max-w-3xl mx-auto p-4">
          <div className="mb-4">
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
              value={editedPost.title || ""}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="body"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Body:
            </label>
            <textarea
              id="body"
              name="body"
              value={editedPost.body || ""}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-4">
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
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSave}
              className="bg-primary hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-secondary text-center my-8">
            {post.title}
          </h2>

          <div className="flex flex-col md:flex-row justify-evenly lg:items-center mb-6 px-8">
            <div className="flex items-center gap-2 text-lg text-gray-700">
              <FaCalendar />
              <p>{formatDateToWord(post.createdAt)}</p>
            </div>
          </div>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-primary leading-relaxed text-center px-28 flex items-center">
            <p>{post.body}</p>
          </div>
        </>
      )}
    </div>
  );
}
