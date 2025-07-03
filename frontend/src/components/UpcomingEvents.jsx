import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Loading from "./Loading";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
export default function UpcomingEvents() {
  const api = import.meta.env.VITE_URL;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate();
  };
  const handleExpand = () => {
    navigate();
  };
  const fetchEvents = async () => {
    setLoading(true);
    const response = await axios.get(`${api}/events/upcoming`);
    if (response.status == 200) {
      setEvents(response.data.data);
      setLoading(false);
    } else {
      setError(response.data.message);
      setLoading(false);
    }
  };
  useEffect(fetchEvents, []);

  if (loading) return <Loading />;
  return (
    <div>
      <h2>Upcoming Events</h2>
      {events.length > 0 &&
        events.map((event, idx) => {
          <div>
            <img
              src={`${api}/images/${event.image}`}
              alt="Background"
              className="w-full h-full object-cover"
            />
            <p className="text-green-500">{event.location}</p>
            <h3>{event.title}</h3>
            <div>
              <p>Event Date:</p>
              <p>{event.date}</p>
            </div>
            <button className="flex">
              <p>Event Details </p>
              <MdArrowOutward />
            </button>
          </div>;
        })}
      <button>See All</button>
    </div>
  );
}
