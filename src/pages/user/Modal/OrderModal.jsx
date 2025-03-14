import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MyContext } from "../../../context/cartContext";
import OrderCard from "../../../components/OrderCard";
import OrderSkeleton from "../../../components/skeleton/OrderSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../../redux/orderSice";


function OrderModal({ onClose }) {
  const id=localStorage.getItem('id')
  const { order,isLoading } = useSelector(state=>state.order);
  const [loading, setLoading] = useState(true);
const dispatch=useDispatch();
  useEffect(() => {
    // Simulating a loading delay
    if(id)
      dispatch(getOrder(id));
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="bg-white p-6 rounded-lg shadow-xl w-96 max-h-[80vh] overflow-auto"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-bold">Order Details</h2>
          <button className="text-gray-600 hover:text-black" onClick={onClose}>
            ✖
          </button>
        </div>

        {isLoading ? (
          <OrderSkeleton />
        ) : order.length === 0 ? (
          <p className="text-gray-500 text-center">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {order.map((item, index) => (
              <OrderCard key={index} order={item} contact={order.contact} date={order.createdAt} />
            ))}
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default OrderModal;
