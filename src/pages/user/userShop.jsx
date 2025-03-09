import React, { useState, useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MyContext } from "../../context/cartContext";
import ItemDetails from "./Modal/detailsOfTheItem";
import ProductCard from "../../components/ProductCard";
import ProductCardSkeleton from "../../components/skeleton/ProductCardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/productSlice";

function UserShop() {
  // const { addToCart  } = useContext(MyContext);
  // const {addToCart}=useSelector(state=>state.cart);
  const {products,isLoading}=useSelector(state=>state.product)
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
const dispatch=useDispatch();


  useEffect(() => {

    dispatch(getAllProducts());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const modalopen = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const modalclose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 mt-10 to-gray-200 py-12 px-4 sm:px-6 lg:px-12">
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
        <div className="relative w-full sm:w-1/2 md:w-1/3">
          <input
            type="text"
            placeholder="Search for products..."
            className="p-3 w-full pl-10 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 place-items-center">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)
        ) : filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-2xl sm:text-3xl font-bold text-gray-500">
            No items found
          </div>
        ) : (
          filteredProducts.map((item, index) => (
            <ProductCard
              key={index}
              item={item}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              modalopen={modalopen}
              // addToCart={addToCart}
            />
          ))
        )}
      </div>

      <ItemDetails isOpen={isModalOpen} modalclose={modalclose} item={selectedItem} />
    </div>
  );
}

export default UserShop;
