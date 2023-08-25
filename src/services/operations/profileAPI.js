import React from 'react'
import { profileEndpoints } from '../apis'
import { toast } from 'react-hot-toast'
import { apiConnector } from '../apiconnector';


const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_STATISTICS_API
} = profileEndpoints

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
    
      const response = await apiConnector(
        "GET",
        GET_USER_ENROLLED_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

    
      console.log(
        "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
        response
      )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
  }

  export async function getInstructorStatistics(token){

    let result = []
    const toastId = toast.loading("Loading...")

    try {
      const response = await apiConnector(
        "GET",
        GET_INSTRUCTOR_STATISTICS_API,
        null,
        { Authorization:`Bearer ${token}`} )

         
      console.log(
        "GET_INSTRUCTOR_STATISTICS API RESPONSE............",
        response
      )
  

      if(!response.data.success)
      {
        throw new Error(response.data.message)
      }

      result = response.data.courses
    } catch (error) {
      console.log("GET_INSTRUCTOR_STATISTICS_API ERROR............", error)
      toast.error("Could Fetch Data")
    }
    toast.dismiss(toastId)
    return result


  }