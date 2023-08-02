import React from 'react'
import HightlightText from './HightlightText'
import kyp  from '../../../assets/Images/Know_your_progress.svg'
import cwo  from '../../../assets/Images/Compare_with_others.svg'
import pyl  from '../../../assets/Images/Plan_your_lessons.svg'


export default function LearninglanguageSection() {
  return (
    <div className='lg:mt-[110px] mt-10'>
    <div className=' flex flex-col gap-5'>

   
       <div className=' text-4xl font-semibold text-center'>
       Your swiss knife for <HightlightText text={ "learning any language"} />
       </div>
       <p className=' text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
        
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-center '>
        <img 
            src={kyp}
            alt='kyy'
            className=' object-contain lg:-mr-32 '
        />
        <img 
            src={cwo}
            alt='cwo'
            className=' object-contain -mt-10 lg:-mt-0'
        />
        <img 
            src={pyl}
            alt='pyl'
            className=' object-contain  lg:-ml-36 -mt-16 lg:-mt-0'
        />

        </div>
         
    </div>
    </div>
  )
}
