import { React, useState, useEffect } from "react";
import Loading from "../components/Loading";
import HeroSection from "../components/HeroSection";
import SubSection from "../components/SubSection";
import axios from "axios";
import Posts from "../components/Posts";
export default function Community() {
  const [community, setCommunity] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const api = import.meta.env.VITE_URL;
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${api}/pages/community`);
        if (res.status === 200) {
          setCommunity(res.data.data);
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
    community && (
      <div>
        <HeroSection
          title={community.heroSection.title}
          image={community.heroSection.image}
        />
        <SubSection
          initialTitle={community.subSection1.title}
          initialBody={community.subSection1.body}
          initialBody2={community.subSection1.body2}
          initialImages={community.subSection1.images}
          initialImage={community.subSection1.image}
          initialVariant={community.subSection1.variant}
          initialAlignment={community.subSection1.alignment}
          id={community.subSection1._id}
        />
        <Posts />
      </div>
    )
  );
}
