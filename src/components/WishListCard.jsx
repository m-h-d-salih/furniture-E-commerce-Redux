import React from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeWishlist } from "../../redux/wishlistSlice";

const WishlistCard = ({ item }) => {
  const id=localStorage.getItem('id')
  const dispatch=useDispatch();
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex items-center bg-gray-100 p-4 rounded-lg shadow"
    >
      <img className="w-16 h-16 object-cover rounded-md" src={item.productId.url} alt={item.name} />
      <div className="ml-4 flex-1">
        <h3 className="text-md font-semibold">{item.productId.name}</h3>
        <p className="text-gray-600 text-sm">${item.productId.price}</p>
      </div>
      <button
        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700"
        onClick={() => 
         dispatch( removeWishlist({id,item}))
         
      }
      >
        <FaTrash />
      </button>
    </motion.div>
  );
};

export default WishlistCard;
