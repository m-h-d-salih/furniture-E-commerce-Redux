import React from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";

const WishlistCard = ({ item, removeCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex items-center bg-gray-100 p-4 rounded-lg shadow"
    >
      <img className="w-16 h-16 object-cover rounded-md" src={item.urlimg} alt={item.title} />
      <div className="ml-4 flex-1">
        <h3 className="text-md font-semibold">{item.title}</h3>
        <p className="text-gray-600 text-sm">${item.price}</p>
      </div>
      <button
        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700"
        onClick={() => removeCart(item)}
      >
        <FaTrash />
      </button>
    </motion.div>
  );
};

export default WishlistCard;
