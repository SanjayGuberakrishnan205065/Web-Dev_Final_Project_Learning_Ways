import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HightlightText from "../components/core/HomePage/HightlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Footer from "../components/comman/Footer";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearninglanguageSection from "../components/core/HomePage/LearninglanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/comman/ReviewSlider";
export default function Home() {
  return (
    <div className=" bg-richblack-900 pt-2 ">
      <div className=" relative pt-5 mx-auto flex flex-col items-center justify-center text-richblack-50">
     
        {/* Section 1 */}

        <div className="flex w-11/12 flex-col items-center justify-center">

          {/* Top buttom  */}
          <Link to={"/signup"}> 
            <div
              className=" group mx-auto mt-16 p-1 rounded-full bg-richblack-800 font-bold  text-richblack-50
       transition-all duration-200  hover:scale-95 w-fit"
            >
              <div
                className="flex flex-row gap-2 items-center justify-center rounded-full px-10 py-[5px]
       transition-all duration-200 group-hover:bg-richblack-900 "
              >
                <p> Become a Teacher </p>
                <FaArrowRight />
              </div>
            </div>
          </Link>

          {/* heading  */}
          <div className=" text-center text-4xl font-semibold mt-8">
            
            Enhance Your Future with
            <HightlightText text={"Coding Proficiency"} />
          </div>

          {/* subheading  */}
          <div className=" mt-8 mx-auto  lg:w-[80%]   text-center text-base font-bold text-richblack-300">
          Through our online coding courses, you have the flexibility to learn at your preferred speed, regardless of your location worldwide. Additionally, you'll have the opportunity to utilize a wide array of materials such as practical projects, quizzes, and individualized guidance provided by instructors.
          </div>

          {/* Learn more and book a demo button  */}
          <div className="flex flex-row  justify-center gap-7 mt-9">
            <CTAButton active={true} linkTo={"/signup"}>
              Learn More{" "}
            </CTAButton>
            <CTAButton active={false} linkTo={"/login"}>
              Book a Demo
            </CTAButton>
          </div>

          {/* video Section */}
          <div className=" flex flex-col items-center justify-center mt-5">
            <div className="  shadow-blue-200 shadow-[0px_0px_30px_0px] mx-3 my-12 w-[70%] h-[70%]  ">
              <video
                className="    shadow-white shadow-[20px_20px_rgba(255,255,255)] "
                muted
                loop
                autoPlay
              >
                <source src={Banner} type="video/mp4"></source>
              </video>
            </div>
          </div>

          {/* code section 1 */}
          <div>
            <CodeBlocks
              position={"lg:flex-row flex-col"}
              heading={
                <div className=" text-4xl font-semibold">
                 Harness your
                  <HightlightText text={"coding potential "} />
                  with our online courses
                </div>
              }
              subheading={
                "Our courses are meticulously crafted and instructed by industry professionals who possess extensive coding experience and a fervor for imparting their wisdom to you."
              }
              ctabtn1={{
                btntxt: "Try it yourself",
                linkTo: "/signup",
                active: true,
              }}
              ctabtn2={{
                btntxt: "Learn More",
                linkTo: "/login",
                active: false,
              }}
              codebolck={`#include <iostream>\nusing namespace std;\nint main() { \n int num1, num2, sum; \n cin>>num1>>num2; \n sum = num1 + num2; \n cout<<"Sum of two numbers:"<<sum; \n return 0; \n}\nOutput: 12 35\nSum of two numbers:47`}
              //   backgroundGradient={}
              codeColor={"text-yellow-300"}
            ></CodeBlocks>
          </div>

          {/* code section 2 */}
          <div>
            <CodeBlocks
              position={"lg:flex-row-reverse flex-col"}
              heading={
                <div className=" text-4xl font-semibold">
                
                 Initiate  moments
                  <HightlightText text={"coding within"} />
                  <br></br>
                  <HightlightText text={"moments"} />
                  {/* with our online courses */}
                </div>
              }
              subheading={
                "Feel free to take the plunge and give it a shot. Our interactive learning environment ensures that you'll start writing actual code right from your initial lesson."
              }
              ctabtn1={{
                btntxt: "Continue Lesson",
                linkTo: "/signup",
                active: true,
              }}
              ctabtn2={{
                btntxt: "Learn More",
                linkTo: "/login",
                active: false,
              }}
              codebolck={`import axios from "axios"\nconst Instance=axios.create({});\nexport const apiConnector=\n( bodyData, headers, params) => { \n return axiosInstance({ \n   data:bodyData? bodyData:null, \n   headers:headers? headers:null, \n   params:params? params:null, \n   url,  \n   method \n}`}
              //   backgroundGradient={}
              codeColor={"text-richblack-500"}
              backgroundGradient={""}
            ></CodeBlocks>
          </div>

          <ExploreMore/>
        </div>

      
      </div>

      {/* Section 2 */}

      <div className=" bg-pure-greys-5  text-richblack-700 pb-10 ">
  
         {/* two buttons */}
        <div className="homepage_bg  h-[310px]">

          <div className="W-11/12 max-w-maxContent flex flex-col justify-between items-center gap-5  mx-auto">

            <div className=" lg:h-[200px] h-[50px] "></div>
            <div className="flex flex-row lg:gap-7 gap-2 text-white">
              <CTAButton active={true} linkTo={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkTo={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="W-11/12 max-w-maxContent flex flex-col justify-between 
        items-center  gap-10 mx-auto  px-6 -my-48 lg:my-0">

          <div className=" flex  lg:flex-row flex-col justify-between lg:gap-0 gap-5 mb-10 mt-[95px]">
            <div className=" text-4xl  font-semibold lg:w-[45%]">
            Acquire the skills necessary for a
              <HightlightText text={"highly sought-after job"} />
            </div>
            <div className=" flex  flex-col gap-10 lg:w-[45%] items-start">
              <div className=" text-[16px]">
              In the modern era of learning, the app "Learning Ways" defines its own parameters. Today, being a competitive specialist entails more than just possessing professional skills.
              </div>
              <CTAButton active={true} linkTo={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>

          <TimelineSection/>
         <LearninglanguageSection/>

         <div className="w-fit pb-48 lg:pb-0">
        <CTAButton active={true} linkTo={"/signup"}>
          Learn more 
        </CTAButton>
      </div>
        </div>

      

      </div>

     {/* section 3 */}
     <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">

      <InstructorSection></InstructorSection>
      <h2 className=" text-center lg:text-4xl  text-2xl font-semibold mt-10  "> Review Form Other Learners </h2>

         <ReviewSlider/>

     </div>

      {/* Footer */}

      <div className=" w-full">
        <Footer></Footer>
      </div>
    </div>
  );
}
