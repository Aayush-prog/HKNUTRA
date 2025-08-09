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
          id={about.heroSection._id}
        />
        <SubSection
          initialTitle={about.subSection1.title}
          initialBody={about.subSection1.body}
          initialBody2={about.subSection1.body2}
          initialImages={about.subSection1.images}
          initialImage={about.subSection1.image}
          initialVariant={about.subSection1.variant}
          initialAlignment={about.subSection1.alignment}
          id={about.subSection1._id}
        />
        <SubSection
          initialTitle={about.subSection2.title}
          initialBody={about.subSection2.body}
          initialBody2={about.subSection2.body2}
          initialImages={about.subSection2.images}
          initialImage={about.subSection2.image}
          initialVariant={about.subSection2.variant}
          initialAlignment={about.subSection2.alignment}
          id={about.subSection2._id}
        />
        <SubSection
          initialTitle={about.subSection3.title}
          initialBody={about.subSection3.body}
          initialBody2={about.subSection3.body2}
          initialImages={about.subSection3.images}
          initialImage={about.subSection3.image}
          initialVariant={about.subSection3.variant}
          initialAlignment={about.subSection3.alignment}
          id={about.subSection3._id}
        />
        <SubSection
          initialTitle={about.subSection4.title}
          initialBody={about.subSection4.body}
          initialBody2={about.subSection4.body2}
          initialImages={about.subSection4.images}
          initialImage={about.subSection4.image}
          initialVariant={about.subSection4.variant}
          initialAlignment={about.subSection4.alignment}
          id={about.subSection4._id}
        />
        <SubSection
          initialTitle={about.subSection5.title}
          initialBody={about.subSection5.body}
          initialBody2={about.subSection5.body2}
          initialImages={about.subSection5.images}
          initialImage={about.subSection5.image}
          initialVariant={about.subSection5.variant}
          initialAlignment={about.subSection5.alignment}
          id={about.subSection5._id}
        />
      </div>
    )
  );
}
