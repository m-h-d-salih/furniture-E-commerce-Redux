import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import bgimage from "../../assets/registration.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { MyContext } from "../../context/cartContext";
import axiosInstance from "../../API/axiosInterceptor";
import { useDispatch } from "react-redux";
import { checkUserLogin } from "../../../redux/userSlice";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

function UserLoginForm() {
  const navigate = useNavigate();
  const {setIsLogged,isLogged}=useContext(MyContext);
  const dispatch=useDispatch();
  const role=import.meta.env.VITE_roleProtectKey;
  return (
    <>
      <Toaster />
      <div
        className="bg-cover bg-center min-h-screen flex items-center justify-center bg-neutral-100"
        // style={{ backgroundImage: `url(${bgimage})` }}
      >
        <div className="rounded-lg p-6 max-w-md w-full border shadow-2xl  bg-neutral-400">
          {/* <h1 className="font-bold text-center">Sign in</h1> */}

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async(values, { setSubmitting }) => {
             try {
              const reponse=await axiosInstance.post('/user/login',values);
             
              const {message,user,token}=reponse.data;
              toast.success(message);
              dispatch(checkUserLogin(user));
              localStorage.setItem('id',user.id);
              localStorage.setItem('token',token);
              if(user.role==='admin'){
                localStorage.setItem('role',role);
                setTimeout(()=>{
                  navigate('/admin');
                },3000);
              }else{
                localStorage.setItem('role',user.role);
                setTimeout(()=>{
                  navigate('/');
                },3000);
              }
             } catch (error) {
              const {message='something went wrong'}=error?.response?.data;
              toast.error(message)
             }finally{
              setSubmitting(false);
             }
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
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 mt-4"
                  />
                  {touched.password && errors.password && (
                    <div style={{ color: "red" }}>{errors.password}</div>
                  )}
                </div>

                <button
                  className="bg-black text-white p-2.5 rounded mt-3 hover:bg-white hover:text-black"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign-in
                </button>
                <button onClick={() => navigate('/signup')} className="bg-black ml-3 text-white p-2.5 rounded mt-3 hover:bg-white hover:text-black">
                  New User?
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default UserLoginForm;
