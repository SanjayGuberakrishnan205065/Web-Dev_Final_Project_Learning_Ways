import React, { useState } from 'react'
import {HomePageExplore} from '../../../data/homepage-explore'
import HightlightText from './HightlightText';
import CourseCard from './CourseCard';

const tabName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"

]

export default function ExploreMore() {

    const [currentTab, setCurrentTab] = useState(tabName[0]);
    const [course , setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);


    // console.log(currentTab)
    // console.log(course)
    // console.log(currentCard)

    const setMyCard = (value)=>{

        // set value to selected tab 
        setCurrentTab(value);

        // filter the card ot this tag 
        const result = HomePageExplore.filter((course)=> course.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
        console.log(result)

    }
  return (
    <div>
    <div className=' text-4xl font-semibold text-center my-10'>
        
      Unleash the  
        <HightlightText text={"Power of Code"}></HightlightText>
    </div>

    <p className=' text-center ring-richblack-300 text-[16px] mt-3'>
        Learn to build anything you can imagine
    </p>


    {/* tab section */}

    <div className='  flex flex-col lg:flex-row lg:gap-5 gap-2 lg:-mt-5 my-8 mx-auto w-max bg-richblack-800
     text-richblack-200 p-1 lg:rounded-full rounded-xl font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]  shadow-richblack-300'>
        

        {
            tabName.map((element, index)=>{
                return (
                    <div
                    className={` text-[16px] flex flex-row items-center gap-5
                    ${currentTab===element
                    ? " bg-richblue-900 text-richblack-5 font-medium"
                    : " text-richblue-200 "} 
                       px-7 py-[7px] lg:rounded-full rounded-xl transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 `}
                     onClick={()=>setMyCard(element)}
                     key={index}>
                    {element}
                        
                    </div>
                );
            })
        } 

    </div>

    <div className='lg:block lg:h-[200px] '>
    <div className='lg:absolute gap-10 flex items-center justify-center lg:gap-0 lg:justify-between flex-wrap lg:w-[90%] lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 '>
        {
            course.map((element,index)=>{
                return (
                      <CourseCard
                    key={index}
                    cardData={element}
                    currentCard= {currentCard}
                    setCurrentCard = {setCurrentCard}

                    /> 
                    
                  
                    
                )
            })
        }
    </div>
        
    </div>

    </div>
  )
}
