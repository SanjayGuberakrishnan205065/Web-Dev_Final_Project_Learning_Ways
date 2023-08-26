import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { HiColorSwatch } from "react-icons/hi";

export default function UpdatePassword() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { loading } = useSelector((state) => state.auth);
  console.log(loading);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // this token retrive from the current url of after /
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-100">
Choose new password</h1>
<p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
Almost done. Enter your new password and youre all set.</p>

          <form onSubmit={handleOnSubmit}>
            <label className=" relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-100">
New password <sup className="text-pink-200">*</sup></p>
              <input
                required
                name="password"
                value={password}
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                onChange={handleOnChange}
                className="form-style w-full !pr-10"

              />

              <span
              
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"

              >
                {!showPassword ? (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                ) : (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                )}
              </span>
            </label>
            <labe className="relative mt-3 block">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-100">
             Confirm new password<sup className="text-pink-200">*</sup></p>
              <input
                required
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                onChange={handleOnChange}
                className="form-style w-full !pr-10"
              />

              <span
             className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {!showConfirmPassword ? (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </labe>

          

            <button type="submit"
                          className="mt-6 w-full rounded-[8px] bg-yellow-200 py-[12px] px-[12px] font-medium text-richblack-900"
>Reset Password</button>
          </form>

          <div className="mt-6 flex items-center justify-between">

            <Link to={"/login"}>
            <p className="flex items-center gap-x-2 text-richblack-100">
 Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
