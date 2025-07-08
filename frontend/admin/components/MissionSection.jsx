import React, { useEffect, useState, useRef } from "react";
import Loading from "./Loading";
import * as ReactIcons from "react-icons/fa";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary text-center">
        Our Mission
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-primary text-center leading-relaxed my-8">
        Driving impact through innovation and a deep commitment to customer
        success.
      </p>

      <div className="lg:flex lg:flex-wrap md:justify-center md:items-start gap-8">
        <div
          id="leftDiv"
          className=" md:grid grid-cols-3 lg:block lg:w-5/12 mb-6 md:mb-0"
          ref={leftDivRef}
        >
          {mission.length > 0 &&
            mission.map((item, idx) => (
              <div
                className="lg:flex text-center lg:text-left items-center gap-5 my-6"
                key={idx}
              >
                <IconRenderer
                  iconName={item.icon}
                  color={item.color}
                />
                <div>
                  <h3
                    className={`text-md md:text-xl font-semibold ${item.color} mb-1`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-base">{item.body}</p>
                </div>
              </div>
            ))}
        </div>

        {showImageSlider && (
          <div className="md:w-3/5 lg:w-5/12 mb-6 md:mb-0">
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
          </div>
        )}
      </div>
    </div>
  );
}
