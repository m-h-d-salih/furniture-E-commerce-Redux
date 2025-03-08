import React from "react";
import { motion } from "framer-motion";

function OrderCard({ order }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-gray-100 p-4 rounded-lg shadow"
    >
      <p className="font-bold">
        Phone: <span className="text-red-500">{order.phone}</span>
      </p>
      <p className="font-bold">
        Order Date: <span className="text-red-500">{order.orderDate}</span>
      </p>
      <p className="font-bold">
        Email: <span className="text-red-500">{order.email}</span>
      </p>
      <p className="font-bold">Ordered Items:</p>
      <ul className="space-y-3">
        {order.cartitems.map((product, idx) => (
          <li key={idx} className="flex items-center space-x-3 border p-2 rounded-lg">
            <img
              src={product.urlimg}
              alt={product.title}
              className="w-16 h-16 rounded-md object-cover"
            />
            <span className="text-red-500">{product.title}</span>
          </li>
        ))}
      </ul>
      <p className="font-bold mt-2">
        Total Price: $<span className="text-red-500">{order.totalprice}</span>
      </p>
    </motion.div>
  );
}

export default OrderCard;
