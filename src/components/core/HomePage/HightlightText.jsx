import React from 'react'

export default function HightlightText({text}) {
  return (
    <span className="bg-gradient-to-b from-[#0340b8] via-[#399bc9] to-[#9ae4cf] text-transparent bg-clip-text font-bold" >
     {" "}
        {text}
    </span>
  )
}
