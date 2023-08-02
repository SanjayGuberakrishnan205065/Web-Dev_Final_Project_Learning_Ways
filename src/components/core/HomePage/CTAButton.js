import React from 'react'
import { Link } from 'react-router-dom'

export default function CTAButton({children, linkTo, active }) {
  return (
   <Link to={linkTo}> 

   <div className={` text-center text-[16px] px-6 py-3 font-bold
   ${active?" bg-yellow-200 text-black":" bg-richblack-800"} 
    hover:scale-95 transition-all duration-200  rounded-lg `}>
     {children}
   </div>
   
   </Link>
  )
}
