import React from 'react'
import { buyCourse } from '../services/operations/StudentFeaturesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchFullCourse } from '../services/operations/courseAPI'
import GetAvgRating from '../utils/avgRating'
import Error from './Error'



export default function CourseDetails() {

   const {token} = useSelector((state)=>state.auth)
   const {user} = useSelector((state)=>state.profile)
   const {loading} = useSelector((state)=>state.profile)
   const {paymentLoading} = useSelector((state)=>state.course)
   const dispatch = useDispatch();
   const navigate= useNavigate();
   const {courseId} = useParams();

   const [courseData, setCoursData] = useState(null);
   const [avgRatingCount, setAvgRatingCount]= useState(0)
   const [totalLectures, setTotalLectures] = useState(0);
   const [confirmationModal, setConfirmatioModal] = useState(null)


   // onchanging course fetch course details
   useEffect(()=>{
    const getCourseDetails = async ()=>{
        const result = await fetchFullCourse(courseId);
        if(result)
          setCoursData(result);
    }
    getCourseDetails()
   
   },[courseId])

  
   // calculatee avg rating 
 
   useEffect(()=>{
    const count = GetAvgRating(courseData.data.CourseDetails.ratingAndReview)
    setAvgRatingCount(count)
   },[courseId])


   //calculate the total number of lecture 
   useEffect(()=>{
    let lectures = 0;
    courseData.data.CourseDetails.courseContent.forEach((section)=>{
        lectures+=section.subSection.length || 0
    })
    setTotalLectures(lectures);
   },[courseData])


    const handleBuyCourse =()=>{

        // only loged in user can buy the course
        if(token){
            buyCourse(token,[courseId],user,navigate, dispatch);
            return
        }
    }


    if(loading || !courseData)
    {
        return <div className='spinner'> Loading...</div>
    }
    if(!courseData.success){
        return <Error/>
    }
  return (
    <div>
        <button className=' bg-yellow-100  p-6 mt-10'
        onClick={()=>handleBuyCourse()}>  
        Buy now

        </button>
    </div>
  )
}
