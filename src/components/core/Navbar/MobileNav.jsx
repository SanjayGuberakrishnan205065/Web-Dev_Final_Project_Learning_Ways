import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assets/Logo/logo-no-background.png";
import { NavbarLinks } from "../../../data/navbar-links";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import ProfileDropDown from "../../core/Auth/ProfileDropDown";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { fetchCourseCategories } from "../../../services/operations/courseAPI";
import { VscHome, VscInfo, VscMail, VscBook } from "react-icons/vsc";
import { FiChevronRight } from "react-icons/fi";
import { logout } from "../../../services/operations/authAPI";
import { VscSignOut } from "react-icons/vsc";
import Dashboard from "../../../pages/Dashboard";
import MobileDashboard from "./MobileDashboard";
import { act } from "@testing-library/react";

export default function MobileNav({ setOpen }) {
  // testing data
  const [subLinks, setSublinks] = useState([]);
  // to check the current element clicked is color is yellow
  const location = useLocation();
  const { trackCourseUpdate } = useSelector((state) => state.course);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // fetch the redux central date by using the react hook useSelector
  const { token } = useSelector((state) => state.auth); // destructor thr token fro the auth sclice that stor in the sclice folder of central data store
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false)

  const fetchCtegories = async () => {
    setLoading(true);
    const result = await fetchCourseCategories();
    // console.log(result);
    if (result) {
      setSublinks(result);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchCtegories();
  }, [trackCourseUpdate]);

  // console.log("sublink",subLinks.length);

  return (
    <div className=" opacity-100 duration-[4.5s]  w-full transition-all overflow-hidden ">
      {/* signup / login / profile dropdown and cart */}

      <div className="items-start flex flex-col gap-y-2 my-2 py-2 border-b-[0.16rem] border-richblack-200">
        {/* profile  */}
        {token !== null && (
          <div
            onClick={() => setOpen(false)}
            className=" flex items-center gap-x-3 ml-7 text-richblack-200"
          >
            <img
              src={user?.image}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div className=" text-left">
              <Link
                to={"/dashboard/my-profile"}
                className=" text-sm font-semibold text-richblack-200"
              >
                {user.firstName} {user.lastName}
              </Link>
              <p className=" text-xs text-richblack-400">Welcome back</p>
            </div>
            <FiChevronRight />
          </div>
        )}

        {
          //cart
          user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <div
              onClick={() => setOpen(false)}
              className=" flex flex-col gap-y-2"
            >
              <Link
                to={"dashboard/cart"}
                className=" relative flex gap-x-2 ml-7"
              >
                <AiOutlineShoppingCart className="text-xl text-richblack-300" />
                <p className=" text-richblack-100">Cart</p>

                {totalItems > 0 && (
                  <span className="  flex-1 items-center justify-center absolute  h-[10px] w-[10px] top-3 left-3 overflow-hidden rounded-full bg-richblack-600 text-center text-[8px] font-bold text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>

           
            </div>
          )
        }

        {token &&
          <div
                onClick={() => {
                  dispatch(logout(navigate));
                  setOpen(false);
                }}
                className="flex w-full items-center gap-x-1 text-sm text-richblack-100 ml-7 cursor-pointer"
              >
                <VscSignOut className="text-xl text-richblack-300" />
                <p className=" text-richblack-100 ml-1"> Logout</p>
              </div>
        }

        <div className=" flex flex-col gap-y-2 items-center mx-auto ">
          {
            //login button

            token === null && (
              <Link to={"/login"}>
                <button
                  onClick={() => setOpen(false)}
                  className=" border border-richblack-700 px-[12px] py-[8px] bg-richblack-900 text-richblack-100 rounded "
                >
                  Log In
                </button>
              </Link>
            )
          }

          {
            //sign up button
            token === null && (
              <Link to={"/signup"}>
                <button
                  onClick={() => setOpen(false)}
                  className="border border-richblack-700 px-[12px] py-[8px] bg-richblack-900 text-richblack-100 rounded "
                >
                  Sign Up
                </button>
              </Link>
            )
          }
        </div>
      </div>

      {/* dashbboard  */}
      {token !== null && (
        <div>
          <MobileDashboard setOpen={setOpen} />
        </div>
      )}

      {/* navlikks */}
      <nav className=" pt-4 ">
        <ul className="flex flex-col gap-y-4 text-richblack-50 ">
          {NavbarLinks.map((link, index) => (

            <li key={index} className=" flex mx-12 items-start ">
              {
                // spacial tritmaent for catlog

                link.title === "Catalog" ? (
                  <div
                   onClick={()=>setActive(!active)}
                    className={`flex flex-col cursor-pointer  ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-50"
                    }`}
                  >
               
                  <p
                      className={` flex gap-x-2  items-center  ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-50"
                      }`}
                    >
                      <VscBook />
                      {link.title}

                    <MdKeyboardArrowDown />
                    </p>
                    

                    <div className=" flex flex-col gap-y-2 text-richblack-100" >
                      {loading ? (
                      active && <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        <>
                          {subLinks
                            ?.filter((sublink) => sublink?.course?.length > 0)
                            ?.map((sublink, i) => (
                              active && (
                                <Link
                               onClick={()=>setOpen(false)}
                                to={`/catalog/${sublink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="  mx-2 px-1 rounded-sm py-1   hover:bg-richblack-500 w-full border-b-[1px] "
                                key={i}
                              >
                                <p>{sublink.name}</p>
                              </Link>
                              )
                             
                            ))}
                        </>
                      ) : (
                      
                      active && <div> No Category Avilable </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      onClick={() => setOpen(false)}
                      className={` flex items-center gap-x-2 ${
                        matchRoute(link?.path)
                          ? " text-yellow-25"
                          : " text-richblack-50"
                      }`}
                    >
                      {link.title === "Home" && <VscHome />}
                      {link.title === "About Us" && <VscInfo />}
                      {link.title === "Contact Us" && <VscMail />}
                      {link?.title}
                    </p>
                  </Link>
                )
              }
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
