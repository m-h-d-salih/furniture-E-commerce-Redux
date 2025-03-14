import React, { useContext } from "react";
import toast from "react-hot-toast";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/cartSlice";

function ItemDetails({ isOpen, modalclose, item }) {
  const id=localStorage.getItem(`id`)
  const dispatch=useDispatch();
  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 px-4"
      onClick={modalclose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white/90 shadow-2xl w-full max-w-3xl mx-auto rounded-xl overflow-hidden flex flex-col md:flex-row border border-gray-300 relative"
        onClick={(e) => e.stopPropagation()} // Prevent accidental modal close
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-gray-300 p-2 rounded-full text-gray-800 hover:bg-gray-400 transition-all shadow-md"
          onClick={modalclose}
        >
          <FaTimes size={22} />
        </button>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            className="w-full h-64 md:h-full object-cover rounded-l-xl"
            src={item.url}
            alt={item.name}
          />
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
            <p className="text-lg font-semibold text-blue-700 mt-1">${item.price}</p>
            <p className="text-sm text-gray-800 leading-relaxed max-h-32 overflow-y-auto mt-2">
              {item.description || "No description available."}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <motion.button
              className="p-4 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-800 transition-all flex items-center space-x-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if(id)
               dispatch( addToCart({id,item}));
               else
               toast(`you need to login first`)
                modalclose();
              }}
            >
              <FaShoppingCart size={20} />
              <span className="hidden md:inline">Add to Cart</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ItemDetails;
