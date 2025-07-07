import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

export default function PastEvents() {
  const api = import.meta.env.VITE_URL;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 6;

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/event/past`);
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
    navigate(`/events/${eventId}`);
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

  let displayedEvents;
  if (showAll) {
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    displayedEvents = events.slice(startIndex, endIndex);
  } else {
    displayedEvents = events.slice(0, 2);
  }

  return (
    <div className="p-4 md:p-8 lg:p-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary text-center mb-8">
        Past Events
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {events.length == 0 && <div className="text-center"> No events to display</div>}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 items-center mx-auto w-full lg:w-3/4 ">
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
              <div className="relative z-10 p-4 text-white flex flex-col justify-between h-full">
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
                    className="mt-2 p-2 inline-flex items-center hover:underline rounded bg-gray-800"
                  >
                    <p>Event Details</p>
                    <MdArrowOutward className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {showAll && events.length > eventsPerPage && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      {!showAll && events.length > 2 && (
        <div className="flex justify-center">
          <button
            onClick={handleExpand}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-green-600"
          >
            See All
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
    </div>
  );
}
