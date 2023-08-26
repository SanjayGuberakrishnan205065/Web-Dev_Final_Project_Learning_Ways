import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { getInstructorStatistics } from '../../../services/operations/profileAPI';
import { useState } from 'react';
import { fetchInstructorCourses } from '../../../services/operations/courseAPI';
import InstructorChart from './InstructorDashboard/InstructorChart';
import { Link } from 'react-router-dom';
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
  const totalStudents = instructorData?.reduce((acc,curr)=>acc+curr.totalEnrolledStudent ,0)


  
  return (
    <div>

    <div className="space-y-2">
        <h1 className="text-2xl font-bold text-richblack-100">
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium text-richblack-200">
          Let's start something new
        </p>
      </div>
      
    {
      loading ? (<div className='spinner'></div>)
      :courses.length>0
      ? (
        <div>
        <div className="my-4 flex h-[450px] space-x-4">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="flex-1 rounded-md bg-richblack-800 p-6">
                <p className="text-lg font-bold text-richblack-50">Visualize</p>
                <p className="mt-4 text-xl font-medium text-richblack-100">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
            {/* Total Statistics */}
            <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
              <p className="text-lg font-bold text-richblack-5">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-richblack-200">Total Courses</p>
                  <p className="text-3xl font-semibold text-richblack-100">
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Students</p>
                  <p className="text-3xl font-semibold text-richblack-100">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Income</p>
                  <p className="text-3xl font-semibold text-richblack-100">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>

        <div>
        {/* rendr 3 courses  */}
        <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-100">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-100">View All</p>
              </Link>

        </div>
        <div className="my-4 flex items-start space-x-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="w-1/3">
                  <img
                    src={course.thumbNail}
                    alt={course.courseName}
                    className="h-[201px] w-full rounded-md object-fit"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-richblack-200">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-richblack-300">
                        {course.studentEnrolled.length} students
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        |
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        Rs. {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
      </div>

      </div>

      )
      :( <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
          <p className="text-center text-2xl font-bold text-richblack-100">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-yellow-100">
              Create a course
            </p>
          </Link>
        </div>)
    }
    </div>
  )

}
