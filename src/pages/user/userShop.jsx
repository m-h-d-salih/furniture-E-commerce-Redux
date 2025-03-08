import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { MyContext } from "../../context/cartContext";
import ItemDetails from "./Modal/detailsOfTheItem";

function UserShop() {
  const { addToCart, products } = useContext(MyContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categorychange = (event) => {
    setSearchTerm(event.target.value);
  };

  const modalopen = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const modalclose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 mt-10 to-gray-200 py-12 px-4 sm:px-6 lg:px-12">
      {/* Search & Filter */}
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
  <div className="relative w-full sm:w-1/2 md:w-1/3">
    <input
      type="text"
      placeholder="Search for products..."
      className="p-3 w-full pl-10 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={searchTerm}
      onChange={handleSearchChange}
    />
    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
  </div>

  {/* <select
    className="p-3 w-full sm:w-auto border border-gray-300 rounded-full shadow-md"
    onChange={categorychange}
  >
    <option value="">All</option>
    <option value="sofa">Sofa</option>
    <option value="bed">Bed</option>
    <option value="cupboard">Cupboard</option>
    <option value="chair">Chair</option>
    <option value="table">Table</option>
  </select> */}
</div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 place-items-center">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-2xl sm:text-3xl font-bold text-gray-500">
            No items found
          </div>
        ) : (
          filteredProducts.map((item, index) => (
            <motion.div
              key={index}
              className="relative bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-500 hover:scale-105 w-full max-w-[400px]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => modalopen(item)}
            >
              <img
                className="w-full h-60 sm:h-72 object-cover rounded-t-xl"
                src={item.urlimg}
                alt={item.title}
              />
              <div className="p-4 sm:p-6">
                <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
                <p className="text-lg sm:text-xl font-semibold text-blue-600">$ {item.price}</p>
              </div>

              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.3 } }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    className="absolute inset-0 flex items-center justify-center space-x-4 bg-white/70 backdrop-blur-md rounded-xl shadow-xl"
                  >
                    <motion.button
                      className="text-black p-3 rounded-lg shadow-md hover:text-gray-700 transition-all duration-500"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                        toast.success(`Item added to cart`);
                      }}
                    >
                      <FaShoppingCart size={22} />
                    </motion.button>
                    <motion.button
                      className="text-red-500 text-2xl hover:text-red-700 transition-all duration-500"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaHeart />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>

      <ItemDetails isOpen={isModalOpen} modalclose={modalclose} item={selectedItem} />
    </div>
  );
}

export default UserShop;
