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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center py-10 md:max-w-5xl mx-auto">
          <stripe-buy-button
            buy-button-id="buy_btn_1Ru9hGCxPOPual9LLKrBEVs5"
            publishable-key="pk_live_51RtN7cCxPOPual9LLO4RKxvIzlLcZW9uRWhqBlmgl4XhcDQH3oQOnJzaecn5jhkY2ZM1qAgCQBcTAb1wt0UMAA8N00i5BrmPuX"
          ></stripe-buy-button>
          <stripe-buy-button
            buy-button-id="buy_btn_1Ru9f1CxPOPual9LVxmuuNDy"
            publishable-key="pk_live_51RtN7cCxPOPual9LLO4RKxvIzlLcZW9uRWhqBlmgl4XhcDQH3oQOnJzaecn5jhkY2ZM1qAgCQBcTAb1wt0UMAA8N00i5BrmPuX"
          ></stripe-buy-button>

          <div className="bg-[#2B6858] text-white p-4 py-11 rounded-lg w-80 text-center shadow-lg">
            <h2 className="text-lg font-semibold">Honorary Membership</h2>
            <p className="mt-1 text-base font-medium">
              Awarded by Invitation Only
            </p>
            <button
              disabled
              className="mt-3 w-full bg-gray-500 text-white font-semibold py-2 rounded opacity-70 cursor-not-allowed"
            >
              Not for Sale
            </button>
            <p className="mt-3 text-xs text-gray-300">
              Granted in Recognition of Service
            </p>
          </div>
        </div>
      </div>
    )
  );
}
