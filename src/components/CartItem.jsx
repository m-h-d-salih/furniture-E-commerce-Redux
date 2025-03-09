import React from "react";
import { motion } from "framer-motion";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeCart, updateQuantity } from "../../redux/cartSlice";

const CartItem = ({ item, quantity }) => {
  const dispatch=useDispatch();
  const id=localStorage.getItem('id')
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg overflow-hidden p-4 sm:p-6"
    >
      <img className="w-full sm:w-40 h-40 object-cover rounded-lg" src={item.url} alt={item.name} />
      <div className="flex flex-col flex-1 p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 mt-1">{item.description}</p>
        <p className="text-lg font-semibold text-blue-600 mt-2">${item.price * quantity}</p>
        <div className="flex items-center space-x-4 mt-4">
          <button className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300" onClick={() => dispatch(updateQuantity({item,id,action:`increment` }))}>

            <FaPlus />
          </button>
          <span className="font-semibold text-gray-700">Qty: {quantity}</span>
          <button className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300" onClick={() => dispatch(updateQuantity({item,id,action:`decrement`}))}>
            <FaMinus />
          </button>
          <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 ml-auto" onClick={() => dispatch(removeCart({id,item}))}>
            <FaTrash />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
