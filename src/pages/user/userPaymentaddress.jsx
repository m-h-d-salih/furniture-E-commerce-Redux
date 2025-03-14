import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axiosInstance from "../../API/axiosInterceptor";

const UserPaymentAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = localStorage.getItem("id");
  const {cart=[]}=useSelector(state=>state.cart);
  const navigate = useNavigate();
  const Subtotal=cart?.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    };
}, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      cardno: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(50, "Must be 50 characters or less").required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      address: Yup.string().required("Required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits")
        .required("Required"),
      cardno: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(16, "Must be exactly 16 digits")
        .max(16, "Must be exactly 16 digits")
        .required("Required"),
    }),
    onSubmit: async(values) => {
      // const neworder = {
      //   cartitems: cart,
      //   totalprice: cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0),
      //   email: values.email,
      //   address: values.address,
      //   phone: values.phone,
      //   orderDate: new Date().toString(),
      // };

      // let allorder = [...order, neworder];
      try {
        const response = await axiosInstance.post(`/user/payment/${id}`, {
            currency: "INR",
            amount: Subtotal ,
           
        });
        // console.log(response);
        
        if (response.data.success) {
            const options = {
                key: "rzp_test_wL1B6IUAUSnQqu", // Replace with live key in production
                amount: Subtotal * 100,
                currency: "INR",
                name: "Wooden-ecommerce",
                description: "Test Transaction",
                image: "https://your-domain.com/path-to-your-image/logo.png", // Use absolute path for image
                order_id: response.data.data.id,
                handler: async function (response) {
                    const verificationResponse = await axiosInstance.post(
                        `/user/paymentverification/${id}`,
                        {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            email: values.email,
                            name: values.name,
                            phone: values.phone,
                        }
                    );
                    if (verificationResponse?.data?.success) {
                      
                        toast.success(`You Paid ₹${Subtotal} Successfully`);
                        navigate("/shop");
                    } else {
                        toast.error("Payment verification failed");
                    }
                },
                // prefill: {
                //     name: user?.username,
                //     email: user?.email,
                //     contact: user?.contact,
                // },
                // notes: {
                //     address: user?.address,
                //     pincode: user?.pincode,
                // },
                // theme: {
                //     color: "#3399cc",
                // },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
                alert(`Payment failed: ${response.error.description}`);
            });
            rzp1.open();
        } else {
            toast.error("Failed to create payment order");
        }
    } catch (error) {
        if (error?.response && error?.response?.status === 404) {
            toast.error("Cart is empty");
        } else {
            console.error("Payment Creation Failed:", error);
            toast.error("Payment Creation Failed. Please try again.");
        }
    }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ backgroundImage: "url('/path-to-homepage-image.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <form onSubmit={formik.handleSubmit} className="w-full max-w-lg bg-opacity-90 bg-white p-8 shadow-lg rounded-lg border border-blue-400">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">User Payment Address</h2>

        {['name', 'email', 'address', 'phone', 'cardno'].map((field, idx) => (
          <div className="mb-4" key={idx}>
            <label className="block text-blue-700 mb-2" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              name={field}
              type={field === "email" ? "email" : "text"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[field]}
              className={`w-full p-2 border rounded ${formik.touched[field] && formik.errors[field] ? "border-red-500" : "border-blue-300"}`}
            />
            {formik.touched[field] && formik.errors[field] && (
              <div className="text-red-500 text-sm mt-1">{formik.errors[field]}</div>
            )}
          </div>
        ))}

        <div>
          <label className="mb-2 mt-2 block text-blue-700">TOTAL PRICE:</label>
          <div className="text-center text-2xl font-bold text-blue-700">$
            {Subtotal}
          </div>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {cart.map((item, index) => (
            <div key={index} className="mb-2 border border-blue-400 p-3 bg-blue-50">
              <p><strong>Product:</strong> {item.productId?.name}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Price:</strong> ${item.productId?.price}</p>
              <p><strong>Total:</strong> ${item.productId?.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Pay Now!</button>
          <button type="button" className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700" onClick={() => navigate('/cart')}>Cancel Payment</button>
        </div>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center border border-blue-400">
            <FaCheckCircle className="text-green-500 text-6xl mb-4 ml-28" />
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Order Successful!</h2>
            <p>Your order has been placed successfully.</p>
            <button
              onClick={() => {
                setIsModalOpen(false);
                navigate('/');
              }}
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPaymentAddress;
