import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/settingsAPI";
import IconBtn from "../../../comman/IconBtn";

const gender = ["Male", "Female", "Non-Binary", "Prefer to not say", "Other"];

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    try {
      console.log(data);
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("FORM SUBMIT ERROR .........", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* profile update  */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-100">
            Profile Information
          </h2>

          {/* first name and last name  */}
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* first  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style bg-richblack-700 "
                
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>

            {/* last name  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="form-style bg-richblack-700"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          {/* DOB and gender */}
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* dob */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="DOB" className="lable-style">
                Date of Birth
              </label>

              <input
                type="date"
                name="DOB"
                id="DOB"
                className="form-style bg-richblack-700"
                {...register("DOB", {
                  required: {
                    value: true,
                    message: "please enter your Date of Birth",
                  },
                  max: {
                    // to limit the date of birth till current date
                    // user can not select date ferther date today
                    // to create the current date in the form of ddmmyy format use below function
                    value: new Date().toISOString().split("T")[0],
                    message: "date of Birth can't be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.DOB}
              />
              {errors.DOB && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.DOB.message}
                </span>
              )}
            </div>

            {/* gender */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>

              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style bg-richblack-700"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {gender.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your gender.
                </span>
              )}
            </div>
          </div>

          {/* contact and about  */}

          <div className="flex flex-col gap-5 lg:flex-row">
            {/* contact  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contact" className="lable-style">
                Contact Number
              </label>

              <input
                type="tel"
                name="contact"
                id="contact"
                placeholder="Enter Contact Number"
                className="form-style bg-richblack-700"
                {...register("contact", {
                  required: {
                    value: true,
                    message: "Please enter your contact Number",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contact}
              />
              {errors.contact && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contact.message}
                </span>
              )}
            </div>

            {/* about  */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
                First Name
              </label>

              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style bg-richblack-700"
                {...register("about", { required: true })}
                defaultValue={user?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter about yourself.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* two buttons  */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-100"
          >
            Cancel
          </button>
          <IconBtn type="submit" text={"Save"}></IconBtn>
        </div>
      </form>
    </div>
  );
}
