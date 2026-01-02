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
          <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23facc15' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-yellow-400 text-gray-900 font-bold text-sm md:text-base px-4 py-2 rounded-full uppercase tracking-wider mb-6"
              >
                Upcoming Race
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
              >
                Himalayan{" "}
                <span className="text-yellow-400">Harmony</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              >
                Experience the ultimate trail running adventure through the
                majestic Himalayas. Challenge yourself and be part of something
                extraordinary.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
              >
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                      50 KM
                    </div>
                    <div className="text-sm text-gray-400">Ultra Trail</div>
                  </div>
                  <div className="w-px h-12 bg-gray-600"></div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                      12 KM
                    </div>
                    <div className="text-sm text-gray-400">Trail Run</div>
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
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span>Learn More & Register</span>
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
          background: #facc15;
          opacity: 1;
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: #facc15;
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
