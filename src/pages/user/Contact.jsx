import React from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import contactImg from "../../assets/contact.jpg";

const Contact = () => {
  return (
    <div className="bg-gray-100 mt-10">
      {/* Hero Section */}
      <div
        className="relative h-96 flex flex-col items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${contactImg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-5xl font-extrabold"
        >
          Get in Touch
        </motion.h1>
      </div>

      {/* Contact Form & Details */}
      <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
          <form>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold w-full hover:bg-yellow-600"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Information</h2>
          <div className="flex items-center gap-4 mb-4">
            <FaPhone className="text-yellow-500 text-2xl" />
            <p className="text-lg text-gray-700">+91 234 567 890</p>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <FaEnvelope className="text-yellow-500 text-2xl" />
            <p className="text-lg text-gray-700">info@wooden.com</p>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-yellow-500 text-2xl" />
            <p className="text-lg text-gray-700">1234 Kinfra , Malappuram, India</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
