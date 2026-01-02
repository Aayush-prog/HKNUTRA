import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroSection(props) {
  const { image, title } = props;
  const api = import.meta.env.VITE_URL;

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
            className="relative w-full h-full flex items-center justify-center"
            style={{ backgroundColor: "#1F2344" }}
          >
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block text-white font-bold text-sm md:text-base px-4 py-2 rounded-full uppercase tracking-wider mb-6"
                style={{ backgroundColor: "#FF8FA3" }}
              >
                Upcoming Race
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
              >
                <span className="text-slate-300">HIMALAYAN</span>
                <br />
                <span style={{ color: "#FF8FA3" }}>HARMONY</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-slate-300 text-lg md:text-xl mb-2 max-w-2xl mx-auto uppercase tracking-wide"
              >
                The <span className="italic" style={{ color: "#FF8FA3" }}>Ultimate</span> Endurance Challenge
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-slate-400 text-sm md:text-base mb-8 max-w-xl mx-auto"
              >
                Experience an ultra-endurance race set in Hong Kong's highland scenery, inspired by Nepal's formidable trails.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
              >
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold" style={{ color: "#FF8FA3" }}>
                      50 KM
                    </div>
                    <div className="text-sm text-slate-400">Ultra Trail</div>
                  </div>
                  <div className="w-px h-12 bg-slate-600"></div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold" style={{ color: "#FF8FA3" }}>
                      12 KM
                    </div>
                    <div className="text-sm text-slate-400">Trail Run</div>
                  </div>
                </div>
              </motion.div>
              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                href="https://himalayanharmony.hknutra.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:opacity-90"
                style={{ backgroundColor: "#FF8FA3" }}
              >
                <span>Register Now</span>
                <svg
                  className="w-5 h-5"
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
