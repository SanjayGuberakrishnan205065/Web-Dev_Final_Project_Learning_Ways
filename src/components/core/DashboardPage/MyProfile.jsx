import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";
import IconBtn from "../../comman/IconBtn";
import { formattedDate } from "../../../utils/dateFormater";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(user);

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-100">
        My profile
      </h1>

      {/* section 1 */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex flex-col md:flex-row items-center lg:gap-x-4 gap-y-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className=" aspect-square w-[78px] rounded-full object-cover"
          />
          <div className=" space-y-1">
            <p className="text-lg text-center md:text-left  font-semibold text-richblack-100">
              {user.firstName + " " + user.lastName}
            </p>
            <p className="text-sm text-center md:text-left  text-richblack-300">{user.email}</p>
          </div>
        </div>

        <IconBtn
        
          text={"Edit"}
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* section2 */}
      
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-100">About</p>
          <IconBtn
            text={"Edit"}
            onclick={() => navigate("/dashboard/settings")}
          >
             <RiEditBoxLine />
          </IconBtn>
        </div>

        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-100"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Somethin about Yourself"}
        </p>
      </div>

      {/* section 3 */}
     
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">

        <div className="flex  w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-100">
          Personal Details</p>
          <IconBtn
            text={"Edit"}
            onclick={() => navigate("/dashboard/settings")}
          >
              <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex flex-col max-w-[500px] justify-between  gap-y-7">

          <div className="flex justify-between flex-col md:flex-row gap-y-4 ">
            <div className=" w-[100%]">
              <p className="mb-2 text-sm text-richblack-300">First Name</p>
              <p className="text-sm font-medium text-richblack-100">
                {user?.firstName}
              </p>
            </div>
            <div className="w-[30%]">
              <p className="mb-2 text-sm text-richblack-300">Last Name</p>
              <p className="text-sm font-medium text-richblack-100">
                {user?.lastName}
              </p>
            </div>
            
          </div>

          <div className="flex justify-between flex-col md:flex-row gap-y-4">
          <div className=" w-[100%]">
              <p className="mb-2 text-sm text-richblack-300">Email</p>
              <p className="text-sm font-medium text-richblack-100">
                {user?.email}
              </p>
            </div>
            <div className=" w-[30%]">
              <p className="mb-2 text-sm text-richblack-300">Gender</p>
              <p className="text-sm font-medium text-richblack-100">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          <div className="flex  justify-between flex-col md:flex-row gap-y-4">
            
          <div className=" w-[100%]">
              <p className="mb-2 text-sm text-richblack-300">Phone Number</p>
              <p className="text-sm font-medium text-richblack-100">
                {user?.additionalDetails?.contact ?? "Add Contact Number"}
              </p>
            </div>
            <div className=" w-[30%]">
              <p className="mb-2 text-sm text-richblack-300">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-100">
                {formattedDate(user?.additionalDetails?.DOB) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>

          

        </div>

      
      </div>
    </div>
  );
}
