import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { addToWishlist } from "../../redux/wishlistSlice";

function ProductCard({ item, index, hoveredIndex, setHoveredIndex, modalopen }) {
  const {id}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  return (
    <motion.div
      className="relative bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-500 hover:scale-105 w-full max-w-[400px]"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onClick={() => modalopen(item)}
    >
      <img
        className="w-full h-60 sm:h-72 object-cover rounded-t-xl"
        src={item.url}
        alt={item.name}
      />
      <div className="p-4 sm:p-6">
        <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
        <p className="text-lg sm:text-xl font-semibold text-blue-600">$ {item.price}</p>
      </div>

      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="absolute inset-0 flex items-center justify-center space-x-4 bg-white/70 backdrop-blur-md rounded-xl shadow-xl"
          >
            <motion.button
              className="text-black p-3 rounded-lg shadow-md hover:text-gray-700 transition-all duration-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                if(id)
               dispatch(addToCart({id,item}));
              else
                toast(`you need to login first`);
              }}
            >
              <FaShoppingCart size={22} />
            </motion.button>
            <motion.button
              className="text-red-500 text-2xl hover:text-red-700 transition-all duration-500"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                if(id)
               dispatch(addToWishlist({id,item}));
              else
                toast(`you need to login first`);
              }}
            >
              <FaHeart />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ProductCard;
