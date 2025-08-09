import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { motion } from "framer-motion";

export default function MembershipReason() {
  const api = import.meta.env.VITE_URL;
  const [membershipReason, setMembershipReason] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchMembershipReason = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/membershipReason/`);
      if (response.status === 200) {
        setMembershipReason(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to fetch membershipReason data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembershipReason();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

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
        More Than a Membership
      </motion.h2>

      <div className="lg:flex lg:flex-wrap md:justify-center md:items-start gap-8">
        <div
          id="leftDiv"
          className="md:grid grid-cols-1 lg:block lg:w-3/4 mb-6 md:mb-0"
        >
          {loading ? (
            <Loading />
          ) : error ? (
            <motion.p className="text-red-500" variants={childVariants}>
              {error}
            </motion.p>
          ) : membershipReason.length > 0 ? (
            membershipReason.map((item, idx) => (
              <motion.div
                className={`flex flex-col md:flex-row items-center gap-5 my-6 ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                key={idx}
                variants={childVariants}
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={`${api}/images/${item.image}`}
                    alt={item.title}
                    className="w-full h-auto rounded-md"
                  />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-semibold mb-1 border-r-2 md:border-r-2 border-gray-300 pr-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-base">{item.body}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="flex items-center justify-center h-full py-4"
              variants={childVariants}
            >
              <p className="text-center">No membership reasons found.</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
