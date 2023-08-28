import React from 'react'
import instructor  from '../../../assets/Images/Instructor.jpg'
import HightlightText from './HightlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
export default function InstructorSection() {
  return (
    <div className='mt-16'>
    <div className='flex flex-col lg:flex-row  lg:gap-28 gap-20 items-center '>

    <div className=' lg:w-[50%] w-[90%] shadow-blue-200 shadow-[0px_0px_30px_0px]'>
     <img
        src={instructor}
        alt='instructor'
        className='shadow-white shadow-[20px_20px_0px_0px] '
     />

    </div>

    <div className=' lg:w-[50%] w-[90%] flex flex-col lg:gap-10 gap-6  items-center lg:items-start '>

    <div className=' text-4xl  font-semibold lg:w-[50%]'>
      Become an
      <HightlightText text={"Instructor"}/>
    </div>

    <p className=' text-richblack-300 font-medium text[16px] lg:w-[90%]'>
    Instructors spanning the globe educate millions of students on "Learning Ways." We furnish you with the means and expertise to teach subjects you're truly passionate about. </p>

    <div  className=' w-fit '>
        <CTAButton  className='' active={true} linkTo={"/signup"}>
        <div className=' flex flex-row items-center gap-2'>
        Start Teaching Today
        <FaArrowRight></FaArrowRight>
        </div>
       
        </CTAButton>
    </div>

    </div>

    </div>

    </div>
  )
}
