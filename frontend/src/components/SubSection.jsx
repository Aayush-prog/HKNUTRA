import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SubSection({
  title,
  body,
  body2,
  image,
  images,
  variant,
  alignment,
  id,
}) {
  const api = import.meta.env.VITE_URL;

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

  if (alignment === "left") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={`flex flex-col sm:flex-row items-center justify-center  py-8 sm:py-12 md:py-16 text-center px-4 space-y-3 sm:space-y-4 md:space-y-5 ${
          variant === "green" ? "bg-green-300 text-white" : "text-black"
        }`}
      >
        <div className="w-full sm:w-1/2 flex flex-col items-center">
          {image && (
            <motion.img
              variants={childVariants}
              src={`${api}/images/${image}`}
              loading="lazy"
              className="w-full sm:w-[110%] md:w-[100%] lg:w-[90%]"
              alt={image}
            />
          )}
          {images && (
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 500,
                disableOnInteraction: true,
              }}
              spaceBetween={30}
              slidesPerView={1}
              className="w-full md:w-3/4"
            >
              {images.map((img, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <img
                      src={`${api}/images/${img}`}
                      loading="lazy"
                      alt={img}
                      className="rounded-full w-full object-cover  shadow-lg"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>

        <div className="w-full sm:w-1/2 flex flex-col items-start">
          {title && (
            <motion.h2
              variants={childVariants}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary"
            >
              {title}
            </motion.h2>
          )}
          {body && (
            <motion.p
              variants={childVariants}
              className="text-sm sm:text-base md:text-lg lg:text-xl font-primary leading-relaxed w-full sm:w-[100%] md:w-[90%] lg:w-[80%]"
            >
              {body}
            </motion.p>
          )}
        </div>
      </motion.div>
    );
  } else {
    // Original Structure when alignment is not left
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={`flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 text-center px-4 space-y-3 sm:space-y-4 md:space-y-5 ${
          variant === "green" ? "bg-green-300 text-white" : "text-black"
        }`}
      >
        {image && (
          <motion.img
            variants={childVariants}
            src={`${api}/images/${image}`}
            loading="lazy"
            className="w-full sm:w-[110vw] md:w-[100vw] lg:w-[60vw]"
            alt={image}
          />
        )}
        {images && (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 500,
              disableOnInteraction: true,
            }}
            spaceBetween={30}
            slidesPerView={1}
            className="w-full md:w-3/4"
          >
            {images.map((img, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <img
                    src={`${api}/images/${img}`}
                    loading="lazy"
                    alt={img}
                    className="rounded-full  w-full object-cover shadow-lg"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        {title && (
          <motion.h2
            variants={childVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary"
          >
            {title}
          </motion.h2>
        )}
        {body && (
          <motion.p
            variants={childVariants}
            className="text-sm sm:text-base md:text-lg lg:text-xl font-primary leading-relaxed w-full sm:w-[80vw] md:w-[70vw] lg:w-[55vw]"
          >
            {body}
          </motion.p>
        )}
        {body2 && (
          <motion.p
            variants={childVariants}
            className="text-sm sm:text-base md:text-lg lg:text-xl font-primary leading-relaxed w-full sm:w-[80vw] md:w-[70vw] lg:w-[55vw]"
          >
            {body2}
          </motion.p>
        )}
      </motion.div>
    );
  }
}
