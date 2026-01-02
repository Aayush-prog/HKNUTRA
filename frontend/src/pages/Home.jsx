import { useEffect, useState } from "react";
import { motion } from "motion/react";
import HeroSection from "../components/HeroSection";
import MissionSection from "../components/MissionSection";
import SubSection from "../components/SubSection";
import UpcomingEvents from "../components/UpcomingEvents";
import axios from "axios";
import Loading from "../components/Loading";

function HimalayanHarmonyBanner() {
  return (
    <div className=" py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-yellow-400/30 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block bg-yellow-400 text-primary font-bold text-xs md:text-sm px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                Upcoming Race
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Himalayan <span className="text-yellow-400">Harmony</span>
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Experience the ultimate trail running adventure through the
                majestic Himalayas. Challenge yourself and be part of something
                extraordinary.
              </p>
              <a
                href="https://himalayanharmony.hknutra.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-primary font-bold text-lg px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span>Learn More & Register</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>

            {/* Race Distances */}
            <div className="flex lg:flex-col gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                  50 KM
                </div>
                <div className="text-sm text-gray-400">Ultra Trail</div>
              </div>
              <div className="w-px lg:w-full lg:h-px bg-gray-600"></div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                  12 KM
                </div>
                <div className="text-sm text-gray-400">Trail Run</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

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
    <div>
      {home && (
        <>
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
          {/* Himalayan Harmony Race Highlight */}
          <HimalayanHarmonyBanner />
          <UpcomingEvents />
        </>
      )}
    </div>
  );
}
