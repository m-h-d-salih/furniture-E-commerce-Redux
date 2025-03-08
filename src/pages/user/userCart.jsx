import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/cartContext";
import { motion } from "framer-motion";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

function UserCart() {
  const { cart, removeCart, updateQuantity } = useContext(MyContext);
  const navigate = useNavigate();
  
  const totalAmount = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  
  return (
    <div className="min-h-screen mt-10 bg-gradient-to-r from-gray-50 to-gray-200 py-12 px-6 lg:px-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Shopping Cart</h2>
      {cart.length > 0 ? (
        <div className="space-y-6">
          {cart.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg overflow-hidden p-4 sm:p-6"
            >
              <img
                className="w-full sm:w-40 h-40 object-cover rounded-lg"
                src={item.urlimg}
                alt={item.title}
              />
              <div className="flex flex-col flex-1 p-4 sm:p-6">
                <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
                <p className="text-lg font-semibold text-blue-600 mt-2">${item.price * item.quantity}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <button
                    className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                    onClick={() => updateQuantity(item, 1)}
                  >
                    <FaPlus />
                  </button>
                  <span className="font-semibold text-gray-700">Qty: {item.quantity}</span>
                  <button
                    className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                    onClick={() => updateQuantity(item, -1)}
                  >
                    <FaMinus />
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 ml-auto"
                    onClick={() => removeCart(item)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-red-600 text-2xl text-center mt-20">Your cart is empty</p>
      )}

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md flex justify-between items-center">
          <span className="text-lg font-bold">Total Price: ${totalAmount}</span>
          <button
            className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-700"
            onClick={() => navigate('/paymentaddress')}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default UserCart;
