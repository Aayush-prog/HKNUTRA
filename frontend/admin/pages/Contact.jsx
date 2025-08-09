import { React, useState, useEffect } from "react";
import Loading from "../components/Loading";
import HeroSection from "../components/HeroSection";
import { FaArrowRight, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";

export default function Contact() {
  const [contact, setContact] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const api = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${api}/pages/contact`);
        if (res.status === 200) {
          setContact(res.data.data);
        } else {
          setError(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, []);

  if (loading) return <Loading />;

  return (
    contact && (
      <div>
        <HeroSection
          title={contact.heroSection.title}
          image={contact.heroSection.image}
        />

        <div className="flex flex-col md:flex-row justify-center gap-10 py-10 md:py-20 items-center px-4">
          <div className="flex flex-col gap-5 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              We'd love to hear from you
            </h2>
            <p className="text-gray-700">
              Whether you're curious about joining, have a question, or want to
              partner with us
            </p>
          </div>
          <div className="flex flex-row md:flex-col gap-4 text-3xl md:text-xl">
            <a
              href="https://www.facebook.com/hknutra"
              className="hover:text-blue-600"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/hk_nutra?igsh=MWc2aTZycjRoaWdqOQ%3D%3D"
              className="hover:text-pink-600"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/@hknepalese"
              className="hover:text-blue-400"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        <form className="mx-auto w-full md:w-3/4 py-5 md:py-10 px-4">
          <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="w-full md:w-1/3">
              <label
                htmlFor="name"
                className="block text-gray-700 text-base font-bold mb-2"
              >
                Your Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                className="appearance-none border-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            <div className="w-full md:w-1/3">
              <label
                htmlFor="email"
                className="block text-gray-700 text-base font-bold mb-2"
              >
                Email Address (optional):
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                className="appearance-none border-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            <div className="w-full md:w-1/3">
              <label
                htmlFor="phone"
                className="block text-gray-700 text-base font-bold mb-2"
              >
                Phone Number:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone"
                className="appearance-none border-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="block text-gray-700 text-base font-bold mb-2"
            >
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              required
              className="appearance-none border-b w-full px-3 text-gray-700 leading-tight focus:outline-none resize-none"
            />
          </div>
          <button className="flex items-center justify-center rounded px-4 py-2 mt-5 bg-primary text-white gap-3">
            <p>Leave us a message</p>
            <FaArrowRight />
          </button>
        </form>
        <div className="flex items-center justify-center bg-amber-300 py-4">
          <div className="w-full md:w-3/4 flex flex-col md:flex-row gap-5 md:gap-3 items-center justify-center px-4 py-5">
            <div className="w-full">
              <h2 className="text-xl font-semibold">
                We are always happy to assist you!
              </h2>
            </div>
            <div className="w-full ">
              <p className="font-semibold">Email Address</p>
              <div className="border-b-2 w-1/4 mx-auto md:mx-0 hidden md:block mb-2"></div>
              <a
                href={`mailto:jpt@example.com`}
                className="text-blue-500 hover:underline"
              >
                official@hknutra.com
              </a>
            </div>
            <div className="w-full">
              <p className="font-semibold">Number</p>
              <div className="border-b-2 w-1/4 mx-auto md:mx-0 hidden md:block mb-2"></div>
              <p>+85268443741</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
