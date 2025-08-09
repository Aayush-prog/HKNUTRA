import { motion } from "motion/react";

export default function HeroSection(props) {
  const { image, title, id } = props;
  const api = import.meta.env.VITE_URL;
  return (
    <div className="relative w-full md:h-[87vh] bg-gray-200 overflow-hidden">
      <img
        src={`${api}/images/${image}`}
        alt="Background"
        className="w-full h-full object-cover"
      />

      <motion.h1
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-4 right-0 max-w-[90vw] sm:max-w-[50vw] lg:max-w-[30vw] bg-yellow-400 text-primary font-bold text-xl  md:text-4xl  lg:text-6xl px-4 py-2 rounded shadow-lg"
      >
        {title}
      </motion.h1>
    </div>
  );
}
