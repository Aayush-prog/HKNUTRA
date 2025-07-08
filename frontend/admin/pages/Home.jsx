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
        />
        <SubSection
          title={home.subSection1.title}
          body={home.subSection1.body}
          body2={home.subSection1.body2}
          images={home.subSection1.images}
          image={home.subSection1.image}
          variant={home.subSection1.variant}
          alignment={home.subSection1.alignment}
        />
        <MissionSection />
        <UpcomingEvents />
      </div>
    )
  );
}
