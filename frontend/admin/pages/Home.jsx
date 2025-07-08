import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import MissionSection from "../components/MissionSection";
import SubSection from "../components/SubSection";
import UpcomingEvents from "../components/UpcomingEvents";
import axios from "axios";
import Loading from "../components/Loading";
export default function Home() {
  const [home, setHome] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const api = import.meta.env.VITE_URL;
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${api}/pages/landing`);
        if (res.status === 200) {
          setHome(res.data.data);
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
    home && (
      <div>
        <HeroSection
          title={home.heroSection.title}
          image={home.heroSection.image}
          id={home.heroSection._id}
        />
        <SubSection
          initialTitle={home.subSection1.title}
          initialBody={home.subSection1.body}
          initialBody2={home.subSection1.body2}
          initialImages={home.subSection1.images}
          initialImage={home.subSection1.image}
          initialVariant={home.subSection1.variant}
          initialAlignment={home.subSection1.alignment}
          id={home.subSection1._id}
        />
        <MissionSection />
        <UpcomingEvents />
      </div>
    )
  );
}
