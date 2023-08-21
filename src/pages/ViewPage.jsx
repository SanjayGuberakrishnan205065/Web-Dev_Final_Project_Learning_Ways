import React from 'react'
import { Outlet } from 'react-router-dom'

export default function ViewPage() {


  return (
    <div>
        <VideoSidebar/>
        <div>
            <Outlet/>
        </div>
        
    </div>
  )
}
