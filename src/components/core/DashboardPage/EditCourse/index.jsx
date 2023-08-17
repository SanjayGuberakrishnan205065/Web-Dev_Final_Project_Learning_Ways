import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { useEffect } from 'react';
import {fetchFullCourse, getFullDetailsOfCourse} from '../../../../services/operations/courseAPI'

export default function EditCourse() {

    const dispatch = useDispatch();
    const {courseId}=useParams();
    const {course} =useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth)

    const [loading, setLoading] = useState(false);

    // on frist render fetch the full course details and set in course slice 
    useEffect(()=>{
        const populateCourseDetails = async ()=>{
            setLoading(true)
            console.log("courseId",courseId)
            // const result = await fetchFullCourse(courseId,token);
            const result = await getFullDetailsOfCourse(courseId,token)
            if(result?.courseDetails)
            {
                 // this is for to set the edit flag as true for render as edit step in rendersteps components 
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }
        
        populateCourseDetails();
    },[])


    if(loading)
    {
        return (
            <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
        )
    }



  return (
    <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
           Edit Course </h1>
       {
        course? (<RenderSteps/>):(
            <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">

        Course Not Foud</p>)
       }

    </div>
  )
}
