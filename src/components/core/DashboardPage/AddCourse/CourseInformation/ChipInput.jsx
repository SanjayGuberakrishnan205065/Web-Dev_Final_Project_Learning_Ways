import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {MdClose} from 'react-icons/md'

export default function ChipInput(
    {
        label,
        name,
        placeholder,
        register,
        errors,
        setValue,
        getValues,
    }
) {


    const {editCourse, course } = useSelector((state)=>state.course)

    // to set the tags 
    const [chips, setChips]= useState([]);

    useEffect(()=>{

        // if the form in editable mode 
        if(editCourse)
        {
            setChips(course?.tag)
        }

        // register the input field on first remder 
        register(name,{required:true, validate : (value)=> value.length>0})
    },[])



    // every changed value of chips set value in form 
    useEffect (()=>{
        setValue(name,chips)
    },[chips])

    // Function that handle the user input at chips are added 
    const handleKeyDown = (event)=>{

        // check for press enter or , 
        if(event.key=== "Enter" || event.key=== ","){
            event.preventDefault()
            const chipsValue = event.target.value.trim();

            // check for this value already present in chips 
            if(chipsValue && !chips.includes(chipsValue)){
                // add this chips value in array and clear the input 
                const newChips = [...chips,chipsValue]
                setChips(newChips);
                event.target.value=""
            }
        }
    }

    // function for handle delete the chips 
    const handleDeleteChips = (chipsIndex)=>{
        // filter the array and remove the given index chips fron chips array 
        const newChips = chips.filter((_,index)=>index!==chipsIndex)
        setChips(newChips)
    }

  return (
    <div className="flex flex-col space-y-2">

    {/* lebel  */}
    <label htmlFor={name} className="text-sm text-richblack-100" >
    {label} <sup className="text-pink-200">*</sup>

    </label>

    {/* display tags  and input field */}
    <div className="flex w-full flex-wrap gap-y-2">

    {/* map all tags and display  */}
    {
        chips.map((chip,index)=>(
            <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-700 px-2 py-1 text-sm   text-yellow-100"
            >
           
            {chip}

            {/* remove button */}
            <button
            type='button'
            className="ml-2 focus:outline-none"
            onClick={()=>handleDeleteChips(index)}
            >
            <MdClose className=' text-sm'/>
            </button>

            </div>
        ))}

        <input
         id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"

        />

    </div>

    {/* Render an error message if the input is required and not filled */}
    {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is Required
        </span>
      )}
    

    </div>
  )
}
