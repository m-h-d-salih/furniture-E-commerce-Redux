import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MyContext } from "../../../context/cartContext";
import WishlistSkeleton from "../../../components/skeleton/WishListSkeleton";
import WishlistCard from "../../../components/WishListCard";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../../../../redux/wishlistSlice";


const WishList = ({ modalClose }) => {
  const id=localStorage.getItem('id');
  const {wishlist,isLoading}=useSelector(state=>state.wishlist);
const dispatch=useDispatch();
  useEffect(() => {
    dispatch(getWishlist(id));
  }, []);
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={modalClose}
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

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <WishlistSkeleton key={i} />
            ))}
          </div>
        ) : wishlist.length > 0 ? (
          <div className="space-y-4">
            {wishlist.map((item, index) => (
              <WishlistCard key={index} item={item}  />
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
