import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "../assets/logo.png";
import { motion } from "framer-motion";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.footer
      className="bg-primary text-white font-primary py-10 md:py-14"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-0">
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left"
            variants={childVariants}
          >
            <img src={Logo} alt="HKNUTRA Logo" className="w-32 md:w-40" />
            <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-200">
              © {new Date().getFullYear()} HKNUTRA. All Rights Reserved.
            </p>
          </motion.div>

          <motion.div
            className="flex space-x-6 text-2xl mt-4 md:mt-0"
            variants={childVariants}
          >
            {[
              { href: "#", Icon: FaFacebook, label: "Visit our Facebook page" },
              { href: "#", Icon: FaTwitter, label: "Visit our Twitter page" },
              {
                href: "#",
                Icon: FaInstagram,
                label: "Visit our Instagram page",
              },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className="text-white hover:text-green-300 transition duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-300 rounded"
                variants={childVariants}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
