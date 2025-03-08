import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/cartContext";
import CartSkeleton from "../../components/skeleton/CartSkeleton";
import CartItem from "../../components/CartItem";


function UserCart() {
  const { cart, removeCart, updateQuantity } = useContext(MyContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // Simulating a loading delay
  }, []);

  const totalAmount = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-r from-gray-50 to-gray-200 py-12 px-6 lg:px-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Shopping Cart</h2>

      {loading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <CartSkeleton key={index} />
          ))}
        </div>
      ) : cart.length > 0 ? (
        <div className="space-y-6">
          {cart.map((item, index) => (
            <CartItem key={index} item={item} updateQuantity={updateQuantity} removeCart={removeCart} />
          ))}
        </div>
      ) : (
        <p className="text-red-600 text-2xl text-center mt-20">Your cart is empty</p>
      )}

      {cart.length > 0 && !loading && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md flex justify-between items-center">
          <span className="text-lg font-bold">Total Price: ${totalAmount}</span>
          <button className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-700" onClick={() => navigate('/paymentaddress')}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default UserCart;
