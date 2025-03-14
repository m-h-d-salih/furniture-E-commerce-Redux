import React from "react";
import { motion } from "framer-motion";

function OrderCard({ order,contact ,date}) {
  
  const totalPrice=order?.products.reduce((acc,item)=>acc+(item.productId.price*item.quantity),0)
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-gray-100 p-4 rounded-lg shadow"
    >
      <p className="font-bold">
        Phone: <span className="text-red-500">{order.contact}</span>
      </p>
      <p className="font-bold">
        Order Date: <span className="text-red-500">{order.createdAt}</span>
      </p>
      {/* <p className="font-bold">
        Email: <span className="text-red-500">{order?.email}</span>
      </p> */}
      <p className="font-bold">Ordered Items:</p>
      <ul className="space-y-3">
        {order.products.map((product, idx) => (
          <li key={product.productId._id} className="flex items-center space-x-3 border p-2 rounded-lg">
            <img
              src={product.productId.url}
              alt={product.productId.name}
              className="w-16 h-16 rounded-md object-cover"
            />
            <span className="text-red-500">{product.productId.name}</span>
          </li>
         ))} 
      </ul>
      <p className="font-bold mt-2">
        Total Price: $<span className="text-red-500">{totalPrice}</span>
      </p>
    </motion.div>
  );
}

export default OrderCard;
