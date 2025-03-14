import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../API/axiosInterceptor";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

function UserRegistrationForm() {
  const navigate = useNavigate();
  const [validateReg, setValidateReg] = useState(false);

  return (
    <>
      <div
        className="bg-cover bg-center  bg-neutral-100 min-h-screen flex items-center justify-center"
        // style={{ backgroundImage: `url(${bgimage})` }}
      >
        <div className=" rounded-lg shadow-md p-6 max-w-md w-full border bg-neutral-400 ">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
             
            }}
            validationSchema={validationSchema}
            onSubmit={async(values, { setSubmitting }) => {
              
              const {confirmPassword,...rest}=values;
           try {
           
            const response=await axiosInstance.post(`/user/register`,rest)
            const {message}=response.data;
            toast.success(message)
            setTimeout(()=>{
              navigate('/login')
            },3000)
           } catch (error) {
            const {message='something went wronng'}=error?.response?.data;
            toast.error(message)
            // console.log(error?.response?.data)
           }
              
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="text-" htmlFor="name"></label>
                  <input
                    placeholder="Name"
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className=" w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />
                  {touched.name && errors.name && (
                    <div style={{ color: "red" }}>{errors.name}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="email"></label>
                  <input
                    placeholder="Email"
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 mt-4"
                  />
                  {touched.email && errors.email && (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="password"></label>
                  <input
                    placeholder="Password"
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="w-full  px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 mt-4"
                  />
                  {touched.password && errors.password && (
                    <div style={{ color: "red" }}>{errors.password}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword"></label>
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 mt-4"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                  )}
                </div>

                <button
                  className="bg-black text-white p-2.5 rounded mt-3 hover:bg-white hover:text-black"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Register
                </button>

                <Toaster />
                <button
                  className="bg-black ml-3 text-white p-2.5 rounded mt-3 hover:bg-white hover:text-black"
                  type="submit"
                  onClick={() => navigate(`/login`)}
                >
                  Already have an account?
                </button>
                <Toaster />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default UserRegistrationForm;
