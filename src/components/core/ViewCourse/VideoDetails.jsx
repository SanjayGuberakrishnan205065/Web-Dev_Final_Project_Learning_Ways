import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function VideoDetails() {

  // required data
  const {courseId,sectionId,subSectionId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const playerRef = useRef();
  const {token}= useSelector((state)=>state.auth)
  const{courseSectionData, courseEntireData, completedLectures}=useSelector((state)=>state.viewCourse)

  // required State 
  const [videoData, setVideoData]= useState([])
  const [previewSource,setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded]= useState(false)
  const [loading, setLoading]= useState(false)

  // on changing the url coursedata and section data 

  useEffect(()=>{
    ;(async()=>{
      // course not avialable 
      if(!courseSectionData.length) return;
      // course id section id or subsection id not present 
      if(!courseId || !sectionId ||!subSectionId )
      {
        navigate("/course/enrolled-courses")
      }
      else{
        //all right 

        // current section
        const filteredData = courseSectionData.filter(
          (section)=>section?._id===sectionId
        )
        // current video 
        const filteredVideoData = filteredData[0]?.subSection.filter(
          (data)=>data._id=subSectionId
        )


        // set value 
        setVideoData(filteredVideoData[0]);
        // if video no present use it 
        setPreviewSource(courseEntireData.thumbNail);
        setVideoEnded(false);
      }
    })()

  },[courseEntireData,courseSectionData,location.pathname])




  // required functions 
  const isFirstVideo =()=>{

    // find the current section index 
    const currentSectionIndex= courseSectionData?.findIndex(
      (section)=>section?._id === sectionId
    )

    const currentSubsectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data)=>data?._id===subSectionId
    )

    // both above index === 0 then it is first video 
    if(currentSectionIndex===0 && currentSubsectionIndex===0)
    {return true}
    else return false;


    
  }

  const isLastVideo =()=>{
    const currentSectionIndex= courseSectionData?.findIndex(
      (section)=>section?._id === sectionId
    )

    const currentSubsectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data)=>data?._id===subSectionId
    )

    const noOfSubsection = courseSectionData[currentSectionIndex]?.subSection.length;

    // both above index at n-1 of their array means it is last video 

    if(currentSectionIndex === courseSectionData.length -1 &&
      currentSubsectionIndex === noOfSubsection-1)
      {
        return true 
      }
      else return false ;



  }

  const goToNextVideo =()=>{

    const currentSectionIndex= courseSectionData?.findIndex(
      (section)=>section?._id === sectionId
    )

    const currentSubsectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data)=>data?._id===subSectionId
    )

    const noOfSubsection = courseSectionData[currentSectionIndex].subSection.length

    // current section have next video
    if(currentSubsectionIndex!== noOfSubsection-1)
    {
      const nextSubsectionId = courseSectionData[currentSectionIndex].subSection[currentSubsectionIndex+1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubsectionId}`)
    }
    else{
      // next section first video 

      const nextSectionId = courseSectionData[currentSectionIndex+1]._id
      const nextSubsectionId = courseSectionData[currentSectionIndex+1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`)

    }

  }
  const goToPreviousVideo =()=>{

    const currentSectionIndex= courseSectionData?.findIndex(
      (section)=>section?._id === sectionId
    )

    const currentSubsectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data)=>data?._id===subSectionId
    )

    const noOfSubsection = courseSectionData[currentSectionIndex-1].subSection.length

    // current section have prev video
    if(currentSubsectionIndex !== 0)
    {
      const prevSubsectionId = courseSectionData[currentSectionIndex].subSection[currentSubsectionIndex-1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubsectionId}`)
    }
    else{
      // prev section last video 

      const nextSectionId = courseSectionData[currentSectionIndex-1]._id
      const nextSubsectionId = courseSectionData[currentSectionIndex+1].subSection[noOfSubsection-1]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`)

    }

  }

  const handleLectureCompletion = async()=>{
    
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)

  }
  return (
    <div>

    </div>
  )
}
