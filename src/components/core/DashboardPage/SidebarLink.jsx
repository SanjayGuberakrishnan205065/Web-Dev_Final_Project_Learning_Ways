import React from 'react'
import { VscAccount,VscDashboard,VscVm,VscAdd,VscMortarBoard,VscHistory,VscArchive,VscSettingsGear } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation , matchPath } from 'react-router-dom';
import { resetCourseState } from '../../../slices/courseSlice';

export default function SidebarLink({link,iconName}) {

    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute =(route)=>{
        return matchPath({path:route},location.pathname)

    }
 


  return (
  
 <NavLink
    to={link.path}
    onClick={()=>dispatch(resetCourseState())}
    className={ ` 
    relative px-8 py-2 text-sm font-medium 
    ${matchRoute(link.path)
    ? "bg-yellow-700 text-yellow-50"
    :"bg-opacity-0 text-richblack-300"}
     transition-all duration-200`}
    >

    {/* side yellow bar  */}

    <span className={` absolute left-0  top-0 h-full w-[0.15rem] bg-yellow-300
    ${ matchRoute(link.path)? " opacity-100":" opacity-0"}`}></span>
     
     <div className=' flex items-center gap-x-2'>
    
     {iconName === "VscAccount" &&(<VscAccount className=' text-lg' />)}
     {iconName === "VscDashboard" &&(<VscDashboard className=' text-lg' />)}
     {iconName === "VscVm" &&  (<VscVm className=' text-lg' />)}
     {iconName === "VscAdd" &&(<VscAdd className=' text-lg' />)}
     {iconName === "VscMortarBoard" &&(<VscMortarBoard className=' text-lg' />)}
     {iconName === "VscHistory" &&(<VscHistory className=' text-lg' />)}
     {iconName === "VscArchive" &&(<VscArchive className=' text-lg' />)}
     {iconName === "VscSettingsGear" && (<VscSettingsGear className=' text-lg' />)}
     
     
     

     <span> {link.name}</span>

     </div>

    </NavLink>

   
  )
}


