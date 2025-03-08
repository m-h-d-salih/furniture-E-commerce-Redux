import React, { useContext } from "react";
import { motion } from "framer-motion";
import { MyContext } from "../../../context/cartContext";
import { FaTrash } from "react-icons/fa";

const WishList = ({ modalClose }) => {
  const { cart: wishlist, removeCart } = useContext(MyContext);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="bg-white p-6 rounded-lg shadow-xl w-96 max-h-[80vh] overflow-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Wishlist</h2>
          <button className="text-gray-600 hover:text-black" onClick={modalClose}>✖</button>
        </div>

        {wishlist.length > 0 ? (
          <div className="space-y-4">
            {wishlist.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex items-center bg-gray-100 p-4 rounded-lg shadow"
              >
                <img
                  className="w-16 h-16 object-cover rounded-md"
                  src={item.urlimg}
                  alt={item.title}
                />
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
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">Your wishlist is empty.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default WishList;