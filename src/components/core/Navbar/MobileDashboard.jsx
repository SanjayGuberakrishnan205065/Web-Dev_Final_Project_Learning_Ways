import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "../DashboardPage/SidebarLink";
import { useLocation, useNavigate } from "react-router-dom";


import { IoIosArrowDropdownCircle } from "react-icons/io";

export default function MobileDashboard({ setOpen }) {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const location = useLocation();
  const navigate = useNavigate();

  const [active, setActive] = useState(false);

  if (authLoading || profileLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800 ">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div>
      <div className=" text-xl font-semibold  border-b-[0.16rem] border-richblack-200 pb-2 ">
        <div
          onClick={() => {
            setActive(!active);
            navigate("/dashboard/my-profile");
          }}
          className=" flex gap-x-8 items-center transition-all duration-200 text-richblack-100 "
        >
          <p className=" ml-3">Dashboard</p>
          <div
            className={`${
              active && " rotate-180 transition-all duration-300"
            } text-richblack-200`}
          >
            <IoIosArrowDropdownCircle />
          </div>
        </div>

        {/* sidebar top 3 link  */}

        {active && (
          <div className="flex  h-[calc(100vh-3.5rem  flex-col  bg-richblack-800 py-5">
            <div onClick={()=>setOpen(false)} className=" flex flex-col  ">
              {sidebarLinks.map((link) => {
                // checking to which dashbord will be render student of instructor
                if (link.type && user.accountType !== link.type) return null;
                if (link.name === "Cart") return null;
                return (
                  <SidebarLink  key={link.id} link={link} iconName={link.icon} />
                );
              })}
            </div>
       
            <div onClick={()=>setOpen(false)} className=" flex flex-col">
              {/* setting */}
              <SidebarLink
                link={{ name: "Setting", path: "dashboard/settings" }}
                iconName={"VscSettingsGear"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
