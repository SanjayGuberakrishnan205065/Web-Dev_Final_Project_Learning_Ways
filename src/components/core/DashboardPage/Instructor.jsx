import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { getInstructorStatistics } from '../../../services/operations/profileAPI';
import { useState } from 'react';
import { fetchInstructorCourses } from '../../../services/operations/courseAPI';

export default function Instructor() {

  const {user}= useSelector((state)=>state.profile);
  const {token}= useSelector((state)=>state.auth)

  const [loading,setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses]= useState([])

  useEffect(()=>{
    ;(async()=>{
      setLoading(true)
      const instructorApiData = await getInstructorStatistics(token);
      const result = await fetchInstructorCourses(token)
      console.log(instructorApiData)

      if(instructorApiData.length) setInstructorData(instructorApiData)
      if(result) setCourses(result)
      setLoading(false)

    })()
  },[])

  console.log("cour",courses)
  console.log("statistics",instructorData)

  const totalAmount = instructorData?.reduce(
    (acc,curr)=>acc+curr.totalUrning,  0
  )
  const totalStudent = instructorData?.reduce((acc,curr)=>acc+curr.totalEnrolledStudent ,0)

  
  
  return (
    <div>
    <div>
      <h1>Hi {user?.firstName} </h1>
      <p>Let's Start Something New</p>
    </div>
    {
      loading ? (<div className='spinner'></div>)
      :courses.length>0
      ? (<div></div>)
      :(<div></div>)
    }

    </div>
  )
}
