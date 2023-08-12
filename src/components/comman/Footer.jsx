import React from "react";
import { FooterLink1} from "../../data/footer-links";
import logo_no_background from "../../assets/Logo/logo-no-background.png";
import FooterSubpart from "./FooterSubpart";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaCopyright,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  // console.log(FooterLink1);
  return (
    // main div
    <div className="w-full">
      <div className="flex lg:flex-row gap-8 items-center justify-between   text-richblack-400 leading-6  mx-auto relative py-10  bg-richblack-800 mt-20 px-10">
        <div className="border-b pt-5 w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-300 ">
          {/* left part */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-300  pl-3 lg:pr-5 gap-3">
            {/* company  */}
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              <img className=" w-[100px]" src={logo_no_background} alt="bg ima" />
              <FooterSubpart
                title={FooterLink1[0].title}
                data={FooterLink1[0].links}
              />
              <div className="flex gap-x-3  text-richblack-300">
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            {/* resourse and support  */}
            <div className="flex  flex-col gap-y-7 w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <FooterSubpart
                title={FooterLink1[1].title}
                data={FooterLink1[1].links}
              />
              <FooterSubpart
                title={FooterLink1[2].title}
                data={FooterLink1[2].links}
              />
            </div>

            {/* plans Community  */}
            <div className="flex  flex-col gap-y-7 w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <FooterSubpart
                title={FooterLink1[3].title}
                data={FooterLink1[3].links}
              />
              <FooterSubpart
                title={FooterLink1[4].title}
                data={FooterLink1[4].links}
              />
            </div>
          </div>

          {/* right part */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {/* company  */}
            <div className='class="w-[48%] lg:w-[30%] mb-7 lg:pl-0"'>
              <FooterSubpart
                title={FooterLink1[5].title}
                data={FooterLink1[5].links}
              />
            </div>

            {/* resourse and support  */}
            <div className="flex  flex-col gap-y-7 w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <FooterSubpart
                title={FooterLink1[6].title}
                data={FooterLink1[6].links}
              />
            </div>

            {/* plans Community  */}
            <div className="flex  flex-col gap-y-7 w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <FooterSubpart
                title={FooterLink1[7].title}
                data={FooterLink1[7].links}
              />
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-richblack-800 flex lg:flex-row   flex-col items-center gap-2   text-richblack-300 text-[14px] leading-6 lg:px-10  pb-10">
        <div className=" flex lg:w-[50%]  gap-5 ">
          <Link to={"#"}  className=" border-r border-richblack-300 pr-2  hover:text-richblack-100 transition-all duration-200">Privacy Policy</Link>
          <Link to={"#"} className="border-r border-richblack-300 pr-2 hover:text-richblack-100  transition-all duration-200">Cookie Policy</Link>
          <Link to={"#"} className="hover:text-richblack-100 transition-all duration-200" >Terms</Link>
        </div>

        <div className=" lg:w-[50%] lg:text-right ">

          Made By Sagar Jadhav  <span className=" inline-block"><FaCopyright /></span> 2023 Learning Ways
        </div>
      </div>
    </div>
  );
}
