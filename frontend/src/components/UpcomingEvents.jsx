import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function UpcomingEvents() {
  const api = import.meta.env.VITE_URL;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/events/upcoming`);
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

  const handleClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleExpand = () => {
    setShowAll(true);
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h2>Upcoming Events</h2>
      {error && <p className="text-red-500">{error}</p>}
      {events.length > 0 &&
        (showAll ? events : events.slice(0, 2)).map((event) => (
          <div key={event._id} className="mb-4">
            <img
              src={`${api}/images/${event.image}`}
              alt={event.title}
              className="w-full h-48 object-cover rounded"
            />
            <p className="text-green-500">{event.location}</p>
            <h3 className="font-semibold">{event.title}</h3>
            <div className="flex items-center space-x-2">
              <p>Event Date:</p>
              <p>{event.date}</p>
            </div>
            <button
              onClick={() => handleClick(event._id)}
              className="flex items-center text-blue-500 hover:underline"
            >
              <p>Event Details</p>
              <MdArrowOutward />
            </button>
          </div>
        ))}
      {!showAll && events.length > 2 && (
        <button
          onClick={handleExpand}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          See All
        </button>
      )}
    </div>
  );
}
