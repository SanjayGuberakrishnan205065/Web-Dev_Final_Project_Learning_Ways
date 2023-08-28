import React from "react";
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timel from '../../../assets/Images/TimelineImage.jpg'


const timeline = [
    {
        logo : logo1,
        heading:"Leadership",
        description:"Fully committed to the success company",
    },
    {
        logo : logo2,
        heading:"Responsibility",
        description:"Students will always be our top priority",
    },
    {
        logo : logo3,
        heading:"Flexibility",
        description:"The ability to switch is an important skills",
    },
    {
        logo : logo4,
        heading:"Solve the problem",
        description:"Code your way to a solution",
    },
    
]


export default function TimelineSection() {
  return (

    <div className="w-11/12 flex lg:flex-row flex-col  gap-16  items-center">

      <div className="lg:w-[45%]  flex flex-col gap-5">
      {
        timeline.map((element, index)=>{
            return(<div className=" flex flex-row gap-6" key={index}>

            <div className=" w-[55px] h-[50px] bg-white rounded-full  justify-center flex items-center">
              <img src={element.logo} alt="logo"></img>
            </div>

            <div>
              <h2 className=" font-semibold text-[18px] ">{element.heading}</h2>
              <p className=" text-base"> {element.description}</p>
            </div>


            </div>)
        })

      }
      </div>

      <div className=" relative shadow-blue-200 shadow-[0px_0px_30px_0px] ">
      
        <img src={timel} 
          alt="timelineImage"
        
          className=" shadow-white shadow-[20px_20px_0px_0px] w-full   h-fit "
        />

        <div className=" absolute bg-caribbeangreen-600 flex flex-col lg:flex-row items-center   text-pure-greys-5 uppercase
         py-5  lg:mx-auto lg:left-[50%] lg:translate-x-[-50%] translate-x-[0%] lg:translate-y-[-50%] translate-y-[-180%]  gap-3 lg:gap-0 w-[165px] lg:w-[90%]">
         
         <div className="lg:w-[50%]  flex flex-row lg:gap-5 gap-8 items-center lg:border-r lg:border-caribbeangreen-300 lg:px-10 px-2 ">
        <p className=" text-3xl font-bold ">10</p>
        <p className=" text-caribbeangreen-300 text-sm ">Years of Experience</p>

         </div>

         <div className=" W-[50%] flex flex-row lgap-5 gap-3 items-center lg:px-14 px-2 ">
        <p className=" text-3xl font-bold ">250</p>
        <p className=" text-caribbeangreen-300 text-sm">TYPES of COURSES</p>

         </div>

        </div>

        
      
      </div>
      
    </div>
  );
}
