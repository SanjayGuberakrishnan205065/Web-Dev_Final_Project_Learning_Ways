import React from 'react'
 
export default function State() {

  const stats =[
    {title:"5K", label:"Active Students"},
    {title:"10+", label:"Mentors"},
    {title:"200+", label:"Courses"},
    {title:"50+", label:"Awards"},
  ]
  return (
    <div className="bg-richblack-800">
        
        <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent  text-richblue-100 mx-auto ">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {stats.map((data, index) => {
            return (
              <div className="flex flex-col py-10" key={index}>
                <h1 className="text-[30px] font-bold text-richblack-5">
                  {data.title}
                </h1>
                <h2 className="font-semibold text-[16px] text-richblack-500">
                  {data.label}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
        
    </div>
  )
}
