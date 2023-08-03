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
    <div>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <h1>Choose new password</h1>
          <p>Almost done. Enter your new password and youre all set.</p>

          <form onSubmit={handleOnSubmit}>
            <label className=" relative">
              <p>New password *</p>
              <input
                required
                name="password"
                value={password}
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                onChange={handleOnChange}
              />

              <span
                className=" absolute"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {!showPassword ? (
                  <AiOutlineEye fontSize={24} />
                ) : (
                  <AiOutlineEyeInvisible fontSize={24} />
                )}
              </span>
            </label>
            <label>
              <p>Confirm new password*</p>
              <input
                required
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                onChange={handleOnChange}
              />

              <span
                className=" absolute"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {!showPassword ? (
                  <AiOutlineEye fontSize={24} />
                ) : (
                  <AiOutlineEyeInvisible fontSize={24} />
                )}
              </span>
            </label>

            <div>abcd</div>

            <button type="submit">Reset Password</button>
          </form>

          <div>
            <Link to={"/login"}>
              <p> Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
