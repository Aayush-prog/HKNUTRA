import { React, useState, useEffect } from "react";
import Loading from "../components/Loading";
import HeroSection from "../components/HeroSection";
import SubSection from "../components/SubSection";
import UpcomingEvents from "../components/UpcomingEvents";
import PastEvents from "../components/PastEvents";
import axios from "axios";
export default function Events() {
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const api = import.meta.env.VITE_URL;
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${api}/pages/event`);
        if (res.status === 200) {
          setEvent(res.data.data);
        } else {
          setError(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, []);
  if (loading) return <Loading />;
  return (
    event && (
      <div>
        <HeroSection
          title={event.heroSection.title}
          image={event.heroSection.image}
        />
        <SubSection
          title={event.subSection1.title}
          body={event.subSection1.body}
          body2={event.subSection1.body2}
          images={event.subSection1.images}
          image={event.subSection1.image}
          variant={event.subSection1.variant}
          alignment={event.subSection1.alignment}
        />
        <UpcomingEvents />
        <PastEvents />
      </div>
    )
  );
}
