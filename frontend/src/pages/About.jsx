import { React, useState, useEffect } from "react";
import Loading from "../components/Loading";
import HeroSection from "../components/HeroSection";
import SubSection from "../components/SubSection";
import axios from "axios";
export default function About() {
  const [about, setAbout] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const api = import.meta.env.VITE_URL;
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${api}/pages/about`);
        if (res.status === 200) {
          setAbout(res.data.data);
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
    <div>
      <HeroSection />
      <SubSection />
      <SubSection />
    </div>
  );
}
