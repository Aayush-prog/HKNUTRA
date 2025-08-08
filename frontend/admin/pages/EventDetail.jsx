import { React, useState, useEffect } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaCalendarWeek } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = import.meta.env.VITE_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editedImages, setEditedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/event/getById/${id}`);
        if (res.status === 200) {
          setEvent(res.data.data);
          setEditedEvent({ ...res.data.data });
          setImagePreview(`${api}/images/${res.data.data.image}`);
          setExistingImages(res.data.data.images || []);
          setError(null);
        } else {
          setError(res.data.message);
          setEvent(null);
          setEditedEvent(null);
          setImagePreview(null);
          setExistingImages([]);
        }
      } catch (err) {
        console.error("Error fetching event data:", err);
        setError("An error occurred while fetching event data.");
        setEvent(null);
        setEditedEvent(null);
        setImagePreview(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id, api]);
  const removeExistingGalleryImage = (imgName) => {
    setExistingImages(existingImages.filter((img) => img !== imgName));
  };
  const removeNewGalleryImage = (indexToRemove) => {
    setEditedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };
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
    setEditedEvent({
      ...editedEvent,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      image: file,
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(event ? `${api}/images/${event.image}` : null);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", editedEvent.title);
      formData.append("body", editedEvent.body);
      if (editedEvent.image && typeof editedEvent.image !== "string") {
        formData.append("image", editedEvent.image);
      }
      formData.append("date", editedEvent.date);
      formData.append("time", editedEvent.time);
      formData.append("location", editedEvent.location);
      editedImages.forEach((file) => file && formData.append("images", file));
      formData.append("existingImages", JSON.stringify(existingImages));
      const response = await axios.patch(`${api}/event/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        alert("success");
        setEvent({ ...editedEvent });
        setImagePreview(
          editedEvent.image && typeof editedEvent.image !== "string"
            ? URL.createObjectURL(editedEvent.image)
            : `${api}/images/${editedEvent.image}`
        );
        setError(null);
        setIsEditing(false);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Error updating event:", err);
      setError("Failed to update event.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        setLoading(true);
        const response = await axios.delete(`${api}/event/del/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.status === 200) {
          alert("Event deleted successfully.");
          navigate("/admin/events");
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error("Error deleting event:", err);
        setError("Failed to delete event.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedEvent({ ...event }); // Revert to original event data
    setImagePreview(`${api}/images/${event.image}`);
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

  if (!event) {
    return (
      <div className="container mx-auto py-8">
        <p>Event not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mb-10">
      <div className="relative">
        <img
          src={imagePreview}
          alt={event.title}
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
              value={editedEvent.title || ""}
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
              value={editedEvent.body || ""}
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
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={editedEvent.date ? editedEvent.date.substring(0, 10) : ""}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Time:
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={editedEvent.time || ""}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={editedEvent.location || ""}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col items-center px-2">
            <label className="text-sm mb-1">Gallery Images:</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setEditedImages((prev) => [
                  ...prev,
                  ...Array.from(e.target.files),
                ])
              }
              className="text-sm"
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {existingImages.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={`${api}/images/${img}`}
                    alt={img}
                    className="h-20 w-20 object-cover rounded"
                  />
                  <button
                    onClick={() => removeExistingGalleryImage(img)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              {editedImages.map((file, idx) => (
                <div key={`new-${idx}`} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="new"
                    className="h-20 w-20 object-cover rounded"
                  />
                  <button
                    onClick={() => removeNewGalleryImage(idx)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
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
            {event.title}
          </h2>

          <div className="flex flex-col md:flex-row justify-evenly lg:items-center mb-4 px-8">
            <div className="flex items-center gap-2 text-lg text-gray-700">
              <FaCalendarWeek className="text-primary" />
              <p>{formatDateToWord(event.date)}</p>
            </div>
            <div className="flex items-center gap-2 text-lg text-gray-700">
              <FaRegClock className="text-primary" />
              <p>{event.time}</p>
            </div>
            <div className="flex items-center gap-2 text-lg text-gray-700">
              <FaLocationDot className="text-primary" />
              <p>{event.location}</p>
            </div>
          </div>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-primary leading-relaxed text-center px-4 sm:px-6 md:px-34 flex items-center">
            <p>{event.body}</p>
          </div>
          <div className="flex items-center mt-8 md:max-w-8xl justify-center mx-auto lg:mx-30 px-4">
            {event.images && event.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-5 mt-8 ">
                {event.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${api}/images/${image}`}
                    alt={`Event image ${index + 1}`}
                    className="w-full h-auto object-cover rounded-md shadow-md"
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
