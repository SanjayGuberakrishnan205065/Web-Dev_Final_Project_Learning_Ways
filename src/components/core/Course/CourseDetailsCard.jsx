import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { toast } from "react-hot-toast";
import { addToCart } from "../../../slices/cartSlice";
import copy from "copy-to-clipboard";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";

export default function CourseDetailsCard({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShare = () => {
    // capy the url that present in current
    copy(window.location.href);
    toast.success("Link copired to clipboard");
  };

  const handleAddToCart = () => {
    // if instructor
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You Are Instructor. You can't Buy Course");
      return;
    }
    // if student
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    // not logged in student
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <div
      className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-100`}
    >
      <img
        src={course?.thumbNail}
        alt="thumbNail"
        className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
      />

      <div className=" px-4">
        <div className="space-x-3 pb-4 text-3xl font-semibold">
          Rs {course?.price}
        </div>

        <div className="flex flex-col gap-4">
          {/* buy button */}
          <button
            className="yellowButton"
            onClick={
              user && course.studentEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && course.studentEnrolled.includes(user?._id)
              ? "Go to Course"
              : "Buy Now"}
          </button>
          {/* add to cart button */}
          {(!user || !course?.studentEnrolled.includes(user?._id)) && (
            <button onClick={handleAddToCart} className="blackButton">
              {" "}
              Add to Cart
            </button>
          )}
        </div>
        <div>
          <p className="pb-3 pt-6 text-center text-sm text-richblack-100">
            30-Day Money-Back Guarantee
          </p>
        </div>

        <div>
          <p className={`my-2 text-xl font-semibold `}>
            This Course Includes :
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {course?.instructions?.map((item, i) => {
                return (
                  <p className=" flex gap-2" key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                );
              })}
            </div>
          </p>
        </div>
        <div className="text-center">
          <button
            className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
            onClick={handleShare}
          >
            <FaShareSquare size={15} /> Share
          </button>
        </div>
      </div>
    </div>
  );
}
