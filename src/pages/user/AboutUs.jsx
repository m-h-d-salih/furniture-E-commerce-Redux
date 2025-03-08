import React from "react";
import { motion } from "framer-motion";
import aboutImg from "../../assets/about.jpg";
import jasim from "../../assets/jasim.jpg";
import jubin from "../../assets/jubin.jpg";
import mueen from "../../assets/mueen.jpg";
const users=[
    {name:'mueen',imgSrc:mueen,role:'Founder'},
    {name:'jubin',imgSrc:jubin,role:'co Founder'},
    {name:'jasim',imgSrc:jasim,role:'Designer'},
]
const AboutUs = () => {
  return (
    <div className="bg-gray-100 mt-10">
      {/* Hero Section */}
      <div
        className="relative h-[70vh] flex flex-col items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutImg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center px-6"
        >
          <h1 className="text-6xl font-extrabold drop-shadow-lg">
            About Our Brand
          </h1>
          <p className="text-lg mt-4 drop-shadow-lg max-w-2xl mx-auto">
            We craft elegant and timeless wooden furniture that enhances your
            living spaces with warmth and sophistication.
          </p>
        </motion.div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
        <p className="text-gray-600 leading-relaxed">
          Founded with a passion for craftsmanship, our journey began with a
          simple idea: to create furniture that blends aesthetics with
          durability. Over the years, we have built a reputation for delivering
          exquisite designs that turn houses into homes.
        </p>
      </div>

      {/* Core Values Section */}
      <div className="bg-white py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-200 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">Quality Craftsmanship</h3>
            <p>Every piece is handcrafted with attention to detail.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-200 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p>We use responsibly sourced materials for a greener planet.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-200 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
            <p>Our customers are at the heart of everything we do.</p>
          </motion.div>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {users.map((name, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <img
                // src={`https://source.unsplash.com/150x150/?portrait&sig=${index}`}
                src={name.imgSrc}
                alt={name.imgSrc}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{name.name}</h3>
              <p className="text-gray-600">{name.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
