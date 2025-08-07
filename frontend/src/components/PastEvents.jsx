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
  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
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

  // Recalculate total pages and reset current page whenever events or filters change
  useEffect(() => {
    const currentFilteredEvents = applyFiltersAndSearch(
      events,
      filterType,
      searchTerm
    );
    setTotalPages(Math.ceil(currentFilteredEvents.length / eventsPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  }, [events, showAll, filterType, searchTerm]); // Add filterType and searchTerm to dependencies

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
  const applyFiltersAndSearch = (eventsToFilter, type, term) => {
    let filtered = eventsToFilter;

    // Apply search term first
    if (term) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(term.toLowerCase()) ||
          event.location.toLowerCase().includes(term.toLowerCase())
        // Add more fields if needed for search
      );
    }

    // Apply filter type based on event.type
    // Only filter if type is not "ALL"
    if (type !== "All") {
      filtered = filtered.filter((event) => {
        // Ensure event.type exists and convert both to lowercase for case-insensitive comparison
        return event.type && event.type.toLowerCase() === type.toLowerCase();
      });
    }
    return filtered;
  };
  // Apply filters and search to the original events array
  const currentFilteredEvents = applyFiltersAndSearch(
    events,
    filterType,
    searchTerm
  );

  // Determine events to display based on showAll and pagination
  let displayedEvents;
  if (showAll) {
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    displayedEvents = currentFilteredEvents.slice(startIndex, endIndex);
  } else {
    // Show only 2 events if not expanded, but still from the filtered list
    displayedEvents = currentFilteredEvents.slice(0, 2);
  }

  return (
    <div className="p-4 md:p-8 lg:p-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary text-center mb-8">
        Past Events
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        {/* Filter Select */}
        <div className="w-full sm:w-auto">
          <label htmlFor="eventFilter" className="sr-only">
            Filter Events
          </label>
          <select
            id="eventFilter"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Events</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-auto">
          <label htmlFor="eventSearch" className="sr-only">
            Search Events
          </label>
          <input
            type="text"
            id="eventSearch"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 items-center mx-auto w-full lg:w-3/4 ">
        {currentFilteredEvents.length === 0 && (
          <div className="col-span-full text-center text-gray-600">
            No events to display with current filters/search.
          </div>
        )}
        {currentFilteredEvents.length > 0 &&
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
      {showAll && currentFilteredEvents.length > eventsPerPage && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      {!showAll && currentFilteredEvents.length > 2 && (
        <div className="flex justify-center">
          <button
            onClick={handleExpand}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-green-600"
          >
            See All
          </button>
        </div>
      )}
      {showAll && currentFilteredEvents.length > 2 && (
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
