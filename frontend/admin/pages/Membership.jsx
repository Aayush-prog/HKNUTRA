import { React, useState, useEffect } from "react";
import Loading from "../components/Loading";
import HeroSection from "../components/HeroSection";
import axios from "axios";
import SubSection from "../components/SubSection";
import MembershipReason from "../components/MembershipReason";
export default function Membership() {
  const [membership, setMembership] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${api}/pages/membership`);
        if (res.status === 200) {
          console.log(res.data.data);
          setMembership(res.data.data);
        } else {
          setError(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, []);

  if (loading) return <Loading />;

  return (
    membership && (
      <div>
        <HeroSection
          title={membership.heroSection.title}
          image={membership.heroSection.image}
        />
        <MembershipReason />
      </div>
    )
  );
}
