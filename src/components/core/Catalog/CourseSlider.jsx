

import React, { useEffect, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/navigation';
// import "../../.."
// Import required modules
import { FreeMode,Navigation, Pagination, Mousewheel, Keyboard ,Autoplay} from 'swiper/modules';

// import { getAllCourses } from "../../services/operations/courseDetailsAPI"
import Course_Card from "./Course_Card"

function Course_Slider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <Swiper

          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            600:{

                slidesPerView:2
            }
            
          }}
        spaceBetween={25}
        loop={true}
        freeMode={true}
        autoplay={
            {
                delay:2500,
                disableOnInteraction:false
            }
        }

          modules={[FreeMode, Pagination, Autoplay]}
        
        
          
          // }}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[220px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-50">No Course Found</p>
      )}
    </>
  )
}

export default Course_Slider
