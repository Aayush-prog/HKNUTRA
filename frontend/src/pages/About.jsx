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
    about && (
      <div>
        <HeroSection
          title={about.heroSection.title}
          image={about.heroSection.image}
        />
        <SubSection
          title={about.subSection1.title}
          body={about.subSection1.body}
          body2={about.subSection1.body2}
          images={about.subSection1.images}
          image={about.subSection1.image}
          variant={about.subSection1.variant}
          alignment={about.subSection1.alignment}
        />
        <SubSection
          title={about.subSection2.title}
          body={about.subSection2.body}
          body2={about.subSection2.body2}
          images={about.subSection2.images}
          image={about.subSection2.image}
          variant={about.subSection2.variant}
          alignment={about.subSection2.alignment}
        />
        <SubSection
          title={about.subSection3.title}
          body={about.subSection3.body}
          body2={about.subSection3.body2}
          images={about.subSection3.images}
          image={about.subSection3.image}
          variant={about.subSection3.variant}
          alignment={about.subSection3.alignment}
        />
        <SubSection
          title={about.subSection4.title}
          body={about.subSection4.body}
          body2={about.subSection4.body2}
          images={about.subSection4.images}
          image={about.subSection4.image}
          variant={about.subSection4.variant}
          alignment={about.subSection4.alignment}
        />
        <SubSection
          title={about.subSection5.title}
          body={about.subSection5.body}
          body2={about.subSection5.body2}
          images={about.subSection5.images}
          image={about.subSection5.image}
          variant={about.subSection5.variant}
          alignment={about.subSection5.alignment}
        />
      </div>
    )
  );
}
