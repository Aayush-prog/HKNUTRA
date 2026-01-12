import React from "react";
import { motion } from "framer-motion";

export default function TeamCards() {
  const teamMembers = [
    {
      id: 1,
      name: "Angbuhang Basant Sean",
      role: "Co-Founder",
      description: "Trail runner and Coach",
      image: "/assets/sean.jpeg",
    },
    {
      id: 2,
      name: "Limbu BedhRaj",
      role: "Co-Founder",
      description: "Trail runner and Coach",
      image: "/assets/bedhraj.jpeg",
    },
    {
      id: 3,
      name: "Gurung Susma",
      role: "Co-Founder",
      description: "Trail runner and Coach",
      image: "/assets/susma.jpeg",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="p-4 md:p-8 lg:p-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto"
        variants={containerVariants}
      >
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 260 }}
            className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900"
          >
            {/* Image */}
            <div className="relative h-[320px]">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-extrabold text-white">
                {member.name}
              </h3>
              <p className="text-green-500 font-semibold mt-1">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-3">
                {member.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
