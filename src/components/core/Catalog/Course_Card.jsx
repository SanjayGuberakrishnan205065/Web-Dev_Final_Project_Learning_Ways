import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating'
import RatingStars from '../../comman/RatingStars'

export default function Course_Card({course, Height}) {

    const [avgReviewCount , setAvgReviewCount]= useState(0)

    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReview)
        setAvgReviewCount(count)
    },[course])

   
  return (
    <div>
        <Link to={`/courses/${course._id}`}>
        <div className="rounded-lg">
                <div>
                    <img src={course?.thumbNail} alt={course.courseName}
                    className={`${Height} w-full rounded-xl object-fit`} />
                </div>
                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-xl text-richblack-100">{course?.courseName}</p>
                    <p className="text-xl text-richblack-100">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div className="flex items-center gap-2">
                    <span className="text-yellow-5">{avgReviewCount || 0}</span>
                    <RatingStars Review_Count={avgReviewCount} />
                        <span className="text-richblack-400">{course?.ratingAndReview?.length} Ratings</span>
                    </div>
                    <p className="text-xl text-richblack-100">₹ {course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}
