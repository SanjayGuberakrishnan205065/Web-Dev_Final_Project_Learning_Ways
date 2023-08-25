import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { apiConnector } from '../../services/apiconnector';
import { reviewEndpoint } from '../../services/apis';
import ReactStars from "react-rating-stars-component"
import { FaStar } from "react-icons/fa"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/navigation';
import "../../App.css"
// import "../../.."
// Import required modules
import { FreeMode, Pagination ,Autoplay} from 'swiper/modules';



export default function ReviewSlider() {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 10


    useEffect(()=>{
        ;(async ()=>{

            const {data}= await apiConnector("GET", reviewEndpoint.ALL_REVIEW_API)

            if(data?.success)
            {
                setReviews(data?.data)
            }


        })()
    })


  return (
    <div className=" text-richblack-100 w-full">

       <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent ">
        <Swiper
        breakpoints={{
            1024: {
              slidesPerView: 4,
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
          className="w-full "
        
        >
            {
                reviews.map((review,i)=>(
                    <SwiperSlide key={i}>
                    <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25 rounded-lg h-[175px]">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-300">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>

                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div>
     
    </div>
  )
}
