import React from 'react'
import CTAButton from './CTAButton'
import {FaArrowRight} from 'react-icons/fa'
import {TypeAnimation} from 'react-type-animation'


export default function CodeBlocks({
    position , heading, subheading, ctabtn1, ctabtn2, codebolck, backgroundGradient, codeColor
}) {
  
  return (
    <div className={` flex ${position} my-10  lg:my-14 justify-between gap-10  sm:flex-col`}>

    {/* left section */}
    <div className='lg:w-[50%] flex flex-col gap-8'>
    {heading}
    <div className=' text-richblack-300 font-bold'>
        {subheading}
    </div>

    <div className='flex gap-7 mt-7'>
    <CTAButton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
    <div className=' flex gap-2 items-center'>
    {ctabtn1.btntxt}
    <FaArrowRight/>
    </div>
    </CTAButton>
    <CTAButton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
    <div className=' flex gap-2 items-center'>
    {ctabtn2.btntxt}
    {/* <FaArrowRight/> */}
    </div>
    </CTAButton>
    </div>
    </div>

    {/* right section  */}
    <div className=' relative'>

    <div className={`flex relative z-1 h-fit flex-row text-10 w-[100%] py-4 lg:w-[500px] border-2 border-pure-greys-600 
     backdrop-blur-3xl	shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] ${backgroundGradient} bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-blue-700 to-sky-500
     `}>
            {/* homework gradient  */}
            {/* numbring */}
            <div className={`w-[10%] flex flex-col text-center   text-pure-greys-500 font-inter font-bold`}>
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
              <p>11</p>
              
            </div>

            {/* code  */}
            <div className={`w-[90%] flex flex-col  text-richblack-400 ${codeColor}  font-mono font-bold pr-2`}>
         
            {/* <TypeAnimation sequence={sequence} */}
            <TypeAnimation sequence={[codebolck,2000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={
              {
                whiteSpace:"pre",
                display:"block"
              }
            }
            >
            </TypeAnimation>

            </div>
     

    </div>

    </div>
   

       


    </div>
  )
}
