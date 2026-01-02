import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HeroBg from "../assets/hero-bg.png";

export default function HeroSection(props) {
  const { image, title, showHimalayanHarmony = false } = props;
  const api = import.meta.env.VITE_URL;

  // If no Himalayan Harmony slide, render simple hero
  if (!showHimalayanHarmony) {
    return (
      <div className="relative w-full md:h-[87vh] h-[60vh] bg-gray-900 overflow-hidden">
        <img
          src={`${api}/images/${image}`}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <motion.h1
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-4 right-0 max-w-[90vw] sm:max-w-[50vw] lg:max-w-[30vw] bg-yellow-400 text-primary font-bold text-xl md:text-4xl lg:text-6xl px-4 py-2 rounded shadow-lg"
        >
          {title}
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="relative w-full md:h-[87vh] h-[60vh] bg-gray-900 overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        className="w-full h-full hero-swiper"
      >
        {/* Slide 1: Himalayan Harmony */}
        <SwiperSlide>
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#0a193c" }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a193c]/20 to-[#0a193c] z-10"></div>

            {/* Background image */}
            <motion.img
              src={HeroBg}
              alt="Trail Runner on Ridge"
              className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-80 mix-blend-overlay"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
              <motion.h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 leading-none drop-shadow-2xl text-white tracking-tighter"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                HIMALAYAN
                <motion.span
                  className="block transform -skew-x-6"
                  style={{
                    background: "linear-gradient(to right, #FF8FA3, #96A6EA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  HARMONY
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-slate-400 text-sm md:text-base mb-8 max-w-xl mx-auto"
              >
                Experience an ultra-endurance race set in Hong Kong's highland
                scenery, inspired by Nepal's formidable trails.
              </motion.p>

              {/* Race distances */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center gap-6 md:gap-10 mb-8"
              >
                <div className="text-center">
                  <div
                    className="text-3xl md:text-5xl font-black tracking-tight"
                    style={{ color: "#FF8FA3" }}
                  >
                    50 KM
                  </div>
                  <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider mt-1">
                    Ultra Trail
                  </div>
                </div>
                <div
                  className="h-12 w-px"
                  style={{ backgroundColor: "#96A6EA" }}
                ></div>
                <div className="text-center">
                  <div
                    className="text-3xl md:text-5xl font-black tracking-tight"
                    style={{ color: "#FF8FA3" }}
                  >
                    12 KM
                  </div>
                  <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider mt-1">
                    Trail Run
                  </div>
                </div>
              </motion.div>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                href="https://himalayanharmony.hknutra.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group inline-block"
              >
                <span
                  className="absolute inset-0 -skew-x-12 translate-x-1.5 translate-y-1.5 border border-white/10"
                  style={{ backgroundColor: "#2a6bf2" }}
                ></span>
                <span
                  className="relative block -skew-x-12 px-10 py-4 hover:-translate-y-0.5 transition-transform border border-white/10"
                  style={{ backgroundColor: "#FF8FA3" }}
                >
                  <span
                    className="block font-black italic uppercase tracking-widest text-sm md:text-lg"
                    style={{ color: "#0a193c" }}
                  >
                    Learn More
                  </span>
                </span>
              </motion.a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2: Original Hero with Backend Image */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={`${api}/images/${image}`}
              alt="Background"
              className="w-full h-full object-cover"
            />
            <motion.h1
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-4 right-0 max-w-[90vw] sm:max-w-[50vw] lg:max-w-[30vw] bg-yellow-400 text-primary font-bold text-xl md:text-4xl lg:text-6xl px-4 py-2 rounded shadow-lg"
            >
              {title}
            </motion.h1>
          </div>
        </SwiperSlide>
      </Swiper>

      <style>{`
        .hero-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #FF8FA3;
          opacity: 1;
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: #FF8FA3;
        }
        .hero-swiper .swiper-button-next:after,
        .hero-swiper .swiper-button-prev:after {
          font-size: 24px;
        }
        @media (max-width: 640px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
