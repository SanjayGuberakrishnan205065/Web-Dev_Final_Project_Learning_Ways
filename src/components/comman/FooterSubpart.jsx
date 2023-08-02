import React from 'react'
import { Link } from 'react-router-dom'

export default function FooterSubpart({title, data }) {
    
  return (
    <div className=''>
    <div className='  text-richblack-200 font-semibold text-[16px]  '> 
    {title}
    </div>
    
    <div className='flex flex-col gap-2 mt-2 '>
        {
             data.map((subdata, index)=>{
                return (<Link key={index} className='text-[14px] cursor-pointer text-richblack-300 hover:text-richblack-100 transition-all duration-200' to={subdata.Link}>
                        {subdata.title}
                </Link>

                )
             })
        }
    </div>

    </div>
  )
}
