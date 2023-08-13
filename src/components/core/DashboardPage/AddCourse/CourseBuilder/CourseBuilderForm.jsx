

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../comman/IconBtn'
import { MdAddCircleOutline , MdNavigateNext} from 'react-icons/md'

import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import { toast } from 'react-hot-toast'
import NestedView from './NestedView'
import { updateSection, createSection} from '../../../../../services/operations/courseAPI'

export default function CourseBuilderForm() {

    const { register,handleSubmit,setValue, formState:{errors},}=useForm()

    const [ editSectionName, setEditSectionName] = useState(null)
    const {course} = useSelector((state)=>state.course)
    const {token} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false)


    // cancle the edit the section name 
    const cancelEdit =()=>
    {
        setEditSectionName(false)
        setValue("sectioName","")
    }



    const onSubmit = async (data)=>{
        
        console.log("in onsubmit")
        setLoading(true)
        let result 
        if(editSectionName)
        {
            result = await updateSection (
                {
                    sectionName:data.sectionName,
                    sectionId:editSectionName,
                    courseId:course._id
                },
                token
            )
        }
        else{
            result = await createSection(
                {
                    sectionName:data.sectionName,
                    courseId:course._id
                } 
                ,token
            )
        }

        console.log("result", result)

        if(result)
        {

            dispatch(setCourse(result));
            setEditSectionName(null)
            setValue("sectionName","")
        }

      setLoading(false)
    }






    const goBack =()=>{

        // here we reduse the step and set course edit value of slice is true 
        // because when instructor go to back that time he/she edit the course 
        dispatch(setStep(1))
        dispatch(setEditCourse(true))


    }
    const goToNext = ()=>{
        // when you go to next step that time at list oone subsection is there in course 
        // with out any subsection genareter we can't move ferther 
        // also we check about the any section have not empty 
        // that every section have atleast one subsection 

        if(course.courseContent.length===0)
        {
            toast.error("Please add atleast one Section ")
            return;
        }

        // check for subsection 

        if(course.courseContent.some((section)=>section.subSection.length===0))
        {
            toast.error("Please add atleast one lecture in each section")
            return
        }

        // if every thingh is fine 
        dispatch(setStep(3))

    }

    // when we click in nested Views button according to that input value and create button change 
    const handleChangeEditSectionName = (sectionId, sectionName)=>{

        //if the section is already there 
        if(editSectionName===sectionId)
        {
            cancelEdit()

            return;
        }
        setEditSectionName(sectionId)
        setValue("sectionName",sectionName)
    }
  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700  p-6">
    <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    <div className="flex flex-col space-y-2">

            <label htmlFor='' className='  lable-style'>
                Section Name <sup className="text-pink-200">*</sup>
            </label>
            <input
                id='sectoionName'
                placeholder='Add Section Name'
                {...register("sectionName", {required:true})}
                className=' form-style w-full'
            />
            {errors.sectionName && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
            )}
        </div>

        <div className="flex items-end gap-x-4">
                {/* edit and create section button  */}
            <IconBtn 
            type="submit"
            text={editSectionName? "Edit Section Name":"Create Section"}
            outline={true}
            customClasses={" text-white"}
            >
            <MdAddCircleOutline size={20} className="text-yellow-300" />

            </IconBtn>

            
            {/* cancel button  */}
            {
                editSectionName && (
                    <button
                    type='button'
                    onClick={cancelEdit}>
                        Cancel Edit 
                    </button>
                )
            }

        </div>
    </form>
    

        {/* /* check is there section field is present or not   */}
    {
        course.courseContent.length > 0 && (

            <NestedView handleChangeEditSectionName ={handleChangeEditSectionName}/>
        )
    }

    {/* two buttons  */}
    <div className=' flex justify-end gap-x-3'>
    <button type='button' onClick={goBack}
   className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}

    >
     Back
    </button>
    <IconBtn text={"Next"} onclick={goToNext}>
    <MdNavigateNext />

    </IconBtn>

    </div>



    </div>
  )
}
