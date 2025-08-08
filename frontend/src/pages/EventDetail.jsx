import { React, useState, useEffect } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { useParams } from "react-router";
import { FaCalendarWeek } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get(`${api}/event/getById/${id}`);
        if (res.status === 200) {
          setEvent(res.data.data);
          setError(null);
        } else {
          setError(res.data.message);
          setEvent(null);
        }
      } catch (err) {
        console.error("Error fetching event data:", err);
        setError("An error occurred while fetching event data.");
        setEvent(null);
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

  if (!event) {
    return (
      <div className="container mx-auto py-8">
        <p>Event not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mb-10">
      <img
        src={`${api}/images/${event.image}`}
        alt={event.title}
        className="w-full h-[75vh] object-cover mb-4"
      />
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-secondary text-center my-8">
        {event.title}
      </h2>

      <div className="flex flex-col md:flex-row justify-evenly lg:items-center mb-4 md:mb-8 px-8">
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
    </div>
  );
}
