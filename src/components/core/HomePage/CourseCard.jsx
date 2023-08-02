import React from 'react'
import {HiUsers} from 'react-icons/hi'
import {ImTree} from 'react-icons/im'

export default function CourseCard({cardData, currentCard, setCurrentCard}) {

 

  return (
    <div className={` w-[300px]  lg:w-[30%] ${ currentCard===cardData?.heading
    ?  "bg-white shadow-[12px_12px_0_0] shadow-yellow-50  hover:bg-richblue-50" 
    :"bg-richblack-800 hover:bg-richblack-200  group"}  text-richblack-25 
    lg:h-[300px] h-[280px] box-border cursor-pointer  transition-all duration-200  `  }
    onClick={()=>setCurrentCard(cardData?.heading)}>


    <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">

      <h1 className={`${
        currentCard===cardData?.heading && " text-richblack-800"
      } font-semibold text-[20px] text-richblack-200 group-hover:text-richblack-800 hover:text-richblack-800`}>
      {cardData.heading}</h1>

      <div className=' text-richblack-400'>
      {cardData?.description}
      </div>

    </div>
  

    <div className={`flex justify-between ${
          currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
        } px-6 py-3 font-medium`}>

      <div className='flex items-center gap-2 text-[16px]'>
      <HiUsers/>
       {cardData?.level}
      </div>

      <div className="flex items-center gap-2 text-[16px]">

      <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
       
      </div>
    </div>
         

    </div>
  )
}
