import React from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import VideoSidebar from '../components/core/ViewCourse/VideoSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFullDetailsOfCourse } from '../services/operations/courseAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalLectures } from '../slices/viewCourse';
export default function ViewPage() {

  const [reviewModal, setReviewModal] = useState(false);
  const {courseId}=useParams();
  const {token}= useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const {courseEntierData} = useSelector((state)=>state.viewCourse)


  // Fetch all required data at first render 
  useEffect(()=>{
    const setCourseDetaills = async()=>{
      const courseData = await getFullDetailsOfCourse(courseId, token)
      dispatch(setCourseSectionData(courseData.courseDetaills.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetaills))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures =0;
      courseData?.courseDetaills?.courseContent?.forEach((sec)=> {
        lectures +=sec.subSection.length
        
      });
      dispatch(setTotalLectures(lectures))
    }

    setCourseDetaills()
    
  },[])

  console.log("coursedata",courseEntierData)
  


  return (
  <>
      <div>
        <VideoSidebar/>
        <div>
            <Outlet/>
        </div>
        
    </div>
    {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
  </>
  )
}
