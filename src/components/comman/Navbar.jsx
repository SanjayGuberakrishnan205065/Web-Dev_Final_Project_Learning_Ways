import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/logo-no-background.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import {AiOutlineShoppingCart}  from "react-icons/ai"
import {MdKeyboardArrowDown}  from "react-icons/md"
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { fetchCourseCategories } from "../../services/operations/courseAPI";


 
 

export default function Navbar() {
  // testing data 
 const [subLinks,setSublinks]= useState([])
  // to check the current element clicked is color is yellow
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path:route }, location.pathname);
  };

  // fetch the redux central date by using the react hook useSelector
  const { token } = useSelector((state) => state.auth); // destructor thr token fro the auth sclice that stor in the sclice folder of central data store
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);


  const fetchCtegories = async ()=>
  {
    const result = await fetchCourseCategories();
    // console.log(result);
    if(result)
    {
      setSublinks(result)
    }
  }
  useEffect(()=>{
     fetchCtegories();

  },[])
 


  return (
    <div className=" flex h-14  items-center justify-center  border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent  items-center justify-between">
        {/* logo  */}
        <Link to={"/"}>
          <img src={logo} width={160} height={42} loading="lazy"  alt="logo"/>
        </Link>

        {/* navlikks */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-50">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {
                  // spacial tritmaent for catlog

                  link.title === "Catalog" ? (
                    <div className=" relative flex items-center gap-1 group hover:text-yellow-25 cursor-pointer transition-all  duration-200">
                    <p>{link.title}</p>
                    <MdKeyboardArrowDown/>

                    {/* drop down  */}
                    <div className=" 
                    invisible opacity-0 absolute flex flex-col bg-richblack-5 text-richblack-900 
                    group-hover:opacity-100  group-hover:visible
                    top-[50%] left-[50%] translate-x-[-50%] mt-5  rounded-md  p-4 lg:w-[300px] transition-all duration-200 z-10">
                     {/* tringle */}
                     <div className="absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-30%] h-6 w-6 rotate-45  bg-richblack-5"></div>
    
                      {
                      
                        subLinks.length? (
                          subLinks.map((sublink,index)=>(
                            <Link to={sublink.name} key={index} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50 z-10">
                              <p className=" text-richblack-900">{sublink.name}</p>
                            </Link>
                          ))

                        ):(<div> No Category Avilable </div>)
                       
                      }

                    </div>
                    </div>

                  

                  ) : (
                    <Link to={link.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? " text-yellow-25"
                            : " text-richblack-50"
                        }`}
                      >
                        {link?.title}
                      </p>
                    </Link>
                  )
                }
              </li>
            ))}
          </ul>
        </nav>

        {/* signup / login / profile dropdown and cart */}

        <div className=" flex gap-x-4 items-center">
 

          
        {   //cart
          user && user?.accountType!= ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to={"dashboard/cart"} className=" relative">
            <AiOutlineShoppingCart/>
            {totalItems>0 &&(
              <span className=" absolute">
                {totalItems}
              </span>
            )}


            </Link>
          )
        }

        { //login button
          token === null && (

            <Link to={"/login"}>
            <button className=" border border-richblack-700 px-[12px] py-[8px] bg-richblack-800 text-richblack-100 rounded ">
              Log In
            </button>

            </Link>
          )


        }

        
        { //sign up button
          token === null && (

            <Link to={"/signup"}>
            <button className="border border-richblack-700 px-[12px] py-[8px] bg-richblack-800 text-richblack-100 rounded">
              Sign Up
            </button>

            </Link>
          )


        }
        {
          token !==  null && <ProfileDropDown> </ProfileDropDown>
        }

        </div>





      </div>
    </div>
  );
}
