import React, { useEffect, useState, useRef } from "react";
import Loading from "./Loading";
import * as ReactIcons from "react-icons/fa";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "motion/react";

export default function MissionSection() {
  const api = import.meta.env.VITE_URL;
  const [mission, setMission] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [leftDivHeight, setLeftDivHeight] = useState(0);
  const leftDivRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const iconMap = {
    ...ReactIcons,
  };

  function IconRenderer({ iconName, color }) {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) return <span>Icon not found</span>;
    return (
      <IconComponent
        className={`mb-2 text-support text-3xl md:text-4xl lg:text-5xl inline-block ${color}`}
      />
    );
  }

  const fetchMission = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/mission/`);
      if (response.status === 200) {
        setMission(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to fetch mission data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMission();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);

      if (leftDivRef.current && window.innerWidth >= 768) {
        setLeftDivHeight(leftDivRef.current.offsetHeight);
      } else {
        setLeftDivHeight(0);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [mission, screenWidth]);

  const showImageSlider = screenWidth > 768;

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  if (loading) return <Loading />; // Display loading component
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>; // Display error message

  return (
    <motion.div
      className="container mx-auto px-6 py-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary text-center"
        variants={childVariants}
      >
        Our Mission
      </motion.h2>

      <div className="lg:flex lg:flex-wrap md:justify-center md:items-start gap-8 px-2">
        <motion.div
          id="leftDiv"
          className=" md:grid grid-cols-3 lg:block lg:w-5/12 mb-6 md:mb-0"
          ref={leftDivRef}
          variants={childVariants}
        >
          {mission.length > 0 &&
            mission.map((item, idx) => (
              <motion.div
                className="lg:flex text-center lg:text-left items-center gap-5 my-6 "
                key={idx}
                variants={childVariants}
              >
                <div>
                  <img
                    src={`${api}/images/${item.image}`}
                    loading="lazy"
                    alt={item.title}
                    className="md:hidden rounded-lg w-full h-full object-cover shadow-md"
                  />
                  <h3 className={`text-md md:text-xl font-semibold mb-1`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-base">{item.body}</p>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {showImageSlider && (
          <motion.div
            className="md:w-3/5 lg:w-5/12 mb-6 md:mb-0"
            variants={childVariants}
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="w-full"
              style={
                screenWidth >= 768 && leftDivHeight
                  ? { height: `${leftDivHeight}px` }
                  : {}
              }
            >
              {mission.length > 0 &&
                mission.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={`${api}/images/${item.image}`}
                      loading="lazy"
                      alt={item.title}
                      className="rounded-lg w-full h-full object-cover shadow-md"
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
