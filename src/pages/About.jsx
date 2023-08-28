import React from "react";
import HightlightText from "../components/core/HomePage/HightlightText";

import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.jpg";
import foundstory from "../assets/Images/FoundingStory.jpg";
import Quote from "../components/core/AboutPage/Quote";
import State from "../components/core/AboutPage/State";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/comman/Footer";
import ReviewSlider from "../components/comman/ReviewSlider";

export default function About() {
  return (
    <div>
      {/* section 1 */}
      <section className="bg-richblack-800">
           <h2 className="  text-center pt-5 text-richblack-300 text-2xl font-semibold"> About Us </h2>
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center  text-richblack-100">
        
          <header className="mx-auto py-16 text-4xl font-semibold lg:w-[70%]">
            
                Pioneering Innovation in Online Education for a 
            <HightlightText text={"Promising Tomorrow"}></HightlightText>
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              <HightlightText text={"Learning way"}></HightlightText> is at the forefront of driving innovation in online
              Education is our passion. We're dedicated to shaping a more radiant future through advanced courses, harnessing emerging technologies, and fostering a dynamic learning community.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={aboutus1} alt="img" />
            <img src={aboutus2} alt="img" />
            <img src={aboutus3} alt="img" />
          </div>
        </div>
      </section>


      {/* section 2 */}
      <section className="border-b border-richblack-700">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      {/* section 3 */}
      
      <section>
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          {/* founding story div */}
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            {/* left */}
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
            <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
             
                  The Inception of Our Story</h1>
             <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                {" "}
                Our e-learning platform emerged from a united vision and dedication to revolutionize education. It commenced with a collective of educators, technologists, and perpetual learners who acknowledged the demand for accessible, adaptable, and top-tier learning prospects within an ever-changing digital landscape.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              As seasoned educators, we personally observed the restrictions and hurdles of conventional educational systems. We firmly believed that learning shouldn't be confined to classroom walls or hindered by geographical limits. Our vision was to establish a platform capable of bridging these gaps, enabling people from diverse backgrounds to unleash their utmost capabilities.
              </p>
            </div>

            {/* right */}
            <div>
              <img src={foundstory} alt="img"
              className="shadow-[0_0_20px_0] shadow-[#FC6767]"

               />
            </div>
          </div>

          {/* vision mision div  */}
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            {/* vision */}
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
            <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                 Our Vision</h1>
                 <p className="text-base font-medium text-richblack-300 lg:w-[95%]">

                {" "}
                Guided by this vision, we embarked on a mission to craft an e-learning platform that would transform the landscape of learning. Our devoted team of experts worked relentlessly to forge a sturdy and user-friendly platform, seamlessly melding cutting-edge technology with captivating content, thereby nurturing a vibrant and participatory learning journey.
              </p>
            </div>
            {/* mision */}
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
            <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
              Our mission</h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                {" "}
                Our purpose transcends mere online course delivery. Our aim was to establish a thriving community of learners, where individuals could come together to connect, collaborate, and glean insights from each other. We hold the conviction that knowledge flourishes in an atmosphere of exchange and discourse. To nurture this spirit of teamwork, we facilitate interactions through forums, live sessions, and networking occasions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <section>
        <State />
      </section>

      {/* section 5 */}
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white ">
        <LearningGrid />

        <ContactFormSection></ContactFormSection>
      </section>


      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900  text-richblue-100">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      <Footer />
    </div>
  );
}
