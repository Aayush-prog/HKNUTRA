import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

export default function UpcomingEvents() {
  const api = import.meta.env.VITE_URL;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 6;

  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    body: "",
    image: null,
    date: "",
    time: "",
    type: "",
    location: "",
    images: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const handleDeleteImage = (indexToDelete) => {
    // Remove the image from newEvent.images
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      images: prevEvent.images.filter((_, index) => index !== indexToDelete),
    }));

    // Remove the corresponding preview URL
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToDelete)
    );
  };
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array

    if (files.length > 0) {
      // Update newEvent.images with the new File objects
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        images: [...prevEvent.images, ...files],
      }));

      // Generate URLs for preview and update imagePreviews
      const newImagePreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [
        ...prevPreviews,
        ...newImagePreviews,
      ]);

      // Clear the input value so the same file can be selected again if needed
      e.target.value = null;
    }
  };
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/event/upcoming`);
      if (response.status === 200) {
        setEvents(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (showAll) {
      setTotalPages(Math.ceil(events.length / eventsPerPage));
      setCurrentPage(1);
    }
  }, [events, showAll]);

  const handleClick = (eventId) => {
    navigate(`/admin/events/${eventId}`);
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
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewEvent((prevEvent) => ({
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
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", newEvent.title);
      formData.append("body", newEvent.body);
      formData.append("image", newEvent.image);
      formData.append("date", newEvent.date);
      formData.append("time", newEvent.time);
      formData.append("location", newEvent.location);
      formData.append("complete", false);
      formData.append("type", newEvent.type);
      newEvent.images.forEach((imageFile, index) => {
        formData.append(`images`, imageFile);
      });
      const response = await axios.post(`${api}/event/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response.data);
      if (response.status === 201) {
        alert("success");
        fetchEvents();
        setShowAddEventForm(false);
        setNewEvent({
          title: "",
          body: "",
          image: null,
          date: "",
          time: "",
          location: "",
          type: "",
          images: [],
        });
        setImagePreview(null);
        setImagePreviews([]);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAddEventForm = () => {
    setShowAddEventForm(!showAddEventForm);
    setNewEvent({
      title: "",
      body: "",
      image: null,
      date: "",
      time: "",
      type: "",
      images: [],
      location: "",
    });
    setImagePreview(null);
    setImagePreviews([]);
    setError(null);
  };

  const EventDisplay = () => {
    let displayedEvents;
    if (showAll) {
      const startIndex = (currentPage - 1) * eventsPerPage;
      const endIndex = startIndex + eventsPerPage;
      displayedEvents = events.slice(startIndex, endIndex);
    } else {
      displayedEvents = events.slice(0, 2);
    }
    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 items-center mx-auto w-full lg:w-3/4 ">
        {events.length == 0 && <div> No events to display</div>}
        {events.length > 0 &&
          displayedEvents.map((event) => (
            <div
              key={event._id}
              className="relative mb-4 rounded-2xl overflow-hidden group h-[300px] sm:h-[350px] md:h-[400px]"
            >
              <img
                src={`${api}/images/${event.image}`}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500"></div>
              <div className="relative z-10 p-5 text-white flex flex-col justify-between h-full">
                <div>
                  <p className="text-green-400 font-bold text-xl">
                    {event.location}
                  </p>
                  <h3 className="font-extrabold text-xl sm:text-2xl">
                    {event.title}
                  </h3>{" "}
                </div>
                <div className="items-center space-x-2 text-sm">
                  <p>Event Date:</p>
                  <p>{formatDateToWord(event.date)}</p>
                  <button
                    onClick={() => handleClick(event._id)}
                    className="mt-2 p-2 inline-flex items-center hover:underline rounded bg-green-500 hover:bg-green-600"
                  >
                    <p>Event Details</p>
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
      events.length > eventsPerPage && (
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
        {!showAll && events.length > 2 && (
          <div className="flex justify-center">
            <button
              onClick={handleExpand}
              className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-green-600"
            >
              Show More
            </button>
          </div>
        )}
        {showAll && events.length > 2 && (
          <div className="flex justify-center">
            <button
              onClick={handleExpand}
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-green-600"
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
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary text-center mb-8">
        Upcoming Events
      </h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleAddEventForm}
          className="px-6 py-2 bg-primary text-white rounded hover:bg-green-600"
        >
          {showAddEventForm ? "Hide Form" : "Add Event"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {showAddEventForm ? (
        <div className="bg-white rounded-lg p-8 w-full max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
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
                value={newEvent.title}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4 md:w-1/2 md:pl-2">
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
                value={newEvent.location}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4 md:w-1/2 md:pr-2">
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
                value={newEvent.date}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4 md:w-1/2 md:pl-2">
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
                value={newEvent.time}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4 md:w-full">
              <label
                htmlFor="type"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Category:
              </label>
              <select
                id="type"
                name="type"
                value={newEvent.type}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Category</option>{" "}
                {/* Default/placeholder option */}
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Kids">Kids</option>
              </select>
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
                value={newEvent.body}
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
            <div className="mb-4 md:w-full">
              <label
                htmlFor="imageUpload"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Add Images:
              </label>
              <input
                type="file"
                id="imageUpload"
                name="imageUpload"
                multiple
                onChange={handleImagesChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                accept="image/*"
              />

              {/* Image Previews Section */}
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {imagePreviews.map((src, index) => (
                    <div
                      key={index}
                      className="relative w-full h-32 overflow-hidden rounded-lg shadow-md"
                    >
                      <img
                        src={src}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs w-6 h-6 flex items-center justify-center hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        aria-label={`Delete image ${index + 1}`}
                      >
                        &times;{" "}
                        {/* HTML entity for a multiplication sign (X) */}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end md:w-full">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                onClick={toggleAddEventForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <EventDisplay />
          <PaginationControls />
          <ShowMoreLessButtons />
        </>
      )}
    </div>
  );
}
