import React from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import VideoSidebar from '../components/core/ViewCourse/VideoSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFullDetailsOfCourse } from '../services/operations/courseAPI';
import { 
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalLectures, } from '../slices/viewCourseSlice';


export default function ViewPage() {

  const [reviewModal, setReviewModal] = useState(false)
  const {courseId}=useParams();
  const {token}= useSelector((state)=>state.auth);
  const dispatch = useDispatch()
  const {courseEntireData, courseSectionData}= useSelector((state)=>state.viewCourse)

  // Fetch all required data at first render 
  useEffect(()=>{
   ;(async()=>{
      const courseData = await getFullDetailsOfCourse(courseId, token)
  
      dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent ))
      dispatch(setEntireCourseData(courseData?.courseDetails))
      dispatch(setCompletedLectures(courseData?.completedVideos))
      let lectures =0;
      courseData?.courseDetails?.courseContent?.forEach((sec)=> {
        lectures +=sec.subSection.length

      
      });
      dispatch(setTotalLectures(lectures))
    })() 
    
  },[])

 
  
  


  return (
  <>
            <div className=" flex min-h-[calc(100vh-3.5rem)]">
               
        <VideoSidebar setReviewModal={setReviewModal}/>

        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto hidden md:block ">

            <div className=' mx-6'>

            <Outlet/>
            </div>
        </div>
      
    </div>
    {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal}/>)}
  </>
  )
}

