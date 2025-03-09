import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import homeimg from "../../assets/home.jpg";
import chair from "../../assets/chair.jpg";
import sofa from "../../assets/sofa.jpg";
import bed from "../../assets/bed.jpeg";
import { FaTruck, FaShieldAlt, FaStar, FaShoppingCart } from "react-icons/fa";
const featured=[
{title:'Stylish Wooden Chair',imgSrc:chair,price:123},
{title:'King Size Bed',imgSrc:bed,price:234},
{title:'Moder Office Sofa',imgSrc:sofa,price:453}

]

const Userhome = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 mt-10">
      {/* Hero Section */}
      <div
        className="relative h-screen flex flex-col items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${homeimg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative  text-center px-6"
        >
          <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">
            Elevate Your Home with Timeless Wooden Furniture
          </h1>
          <p className="text-lg mb-6 drop-shadow-lg">
            Crafted with precision and love, our furniture brings warmth and elegance to every space.
          </p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-yellow-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition duration-300 hover:bg-yellow-600 flex items-center gap-2"
            onClick={() => navigate(`/shop`)}
          >
            <FaShoppingCart size={20} />
            Shop Now!
          </motion.button>
        </motion.div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
            <FaTruck size={40} className="text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast & Free Delivery</h3>
            <p>Enjoy quick and free shipping on all orders above $100.</p>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
            <FaShieldAlt size={40} className="text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p>Made from high-quality wood, ensuring durability and longevity.</p>
          </div>
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
            <FaStar size={40} className="text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Highly Rated</h3>
            <p>Thousands of satisfied customers love our furniture.</p>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Featured Products</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featured.map((item,index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <img
                src={item.imgSrc}
                alt="Furniture"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">${item.price}</p>
              <motion.button onClick={()=>navigate('/shop')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold transition duration-300 hover:bg-yellow-600"
              >
                Shop Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">What Our Customers Say</h2>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-gray-200 p-6 rounded-lg shadow-lg mb-6"
          >
            <p className="text-lg font-semibold">
              "Absolutely love my new wooden table! The quality is top-notch, and delivery was super fast!"
            </p>
            <span className="block text-gray-600 mt-4">- Muheenudheen J.</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-gray-200 p-6 rounded-lg shadow-lg"
          >
            <p className="text-lg font-semibold">
              "The craftsmanship is amazing. My home feels so much cozier with this furniture!"
            </p>
            <span className="block text-gray-600 mt-4">- Ajay Joseph B.</span>
          </motion.div>
        </div>
      </div>

      {/* Footer Section */}
      {/* <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; 2025 Wooden Furniture. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default Userhome;
