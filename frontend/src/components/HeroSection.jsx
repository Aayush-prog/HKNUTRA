import { motion } from "framer-motion";

export default function HeroSection(props) {
  const { image, title } = props;
  const api = import.meta.env.VITE_URL;
  return (
    <div className="relative w-full h-96 bg-gray-200 overflow-hidden">
      <img
        src={`${api}/images/${image}`}
        alt="Background"
        className="w-full h-full object-cover"
      />

      <motion.h1
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-4 right-0 w-full max-w-[90vw] sm:max-w-[50vw] lg:max-w-[25vw] bg-yellow-400 text-primary font-bold text-lg sm:text-xl md:text-2xl px-4 py-2 rounded shadow-lg"
      >
        {title}
      </motion.h1>
    </div>
  );
}
