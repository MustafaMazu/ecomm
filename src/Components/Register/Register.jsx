import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Register = () => {

  const [isLoading , setIsLoading] = useState(false)
  const navigate = useNavigate()


  const user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const validation = Yup.object().shape({
    name: Yup.string()
      .required("name is required")
      .min(3, "name must be at least 3 chars")
      .max(15, "max 15 chars"),
    email: Yup.string()
      .required("email is required")
      .email("enter valid email"),
    password: Yup.string()
      .required("password is required ")
      .matches(
        /^[a-z0-9]{6,9}$/,
        "your password must be at least 6 chars and max 9 chars"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "repassword does not match with password"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "enter valid number"),
  });

  async function registerUser(values) {
    
    setIsLoading(true)
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
     toast.success(res.data.message)
      setIsLoading(false)
      navigate("/login")

    } catch (err) {
     
      toast.error(err.response.data.message )
      setIsLoading(false)
     

    }
    }


  const formik = useFormik({
    initialValues: user,
    onSubmit: registerUser,
    validationSchema: validation,
  });

  return (
    <div className="py-5">
      <h1 className="mb-8 text-green-700 text-5xl font-bold text-center ">
        Registeration Form{" "}
      </h1>

      <div className="md:w-[60%] mx-auto md:p-0 p-5">
        <form onSubmit={formik.handleSubmit}>
          {/* name input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name{" "}
            </label>
          </div>
          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error! </span>
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}

          {/* email input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Email{" "}
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error! </span>
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          {/* password input */}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Password{" "}
            </label>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error! </span>
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          {/* repassword input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="rePassword"
              id="repassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="repassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your rePassword{" "}
            </label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error! </span>
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          {/* phone input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone Number{" "}
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error! </span>
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
          >
           {isLoading == true ? <i className="fa-solid fa-spinner fa-spin text-white"></i> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
