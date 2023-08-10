import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../comman/IconBtn'

export default function RenderTotalAmount() {

  const {total}= useSelector((state)=>state.cart)
  const {courses} = useSelector((state)=>state.cart)

   const bayhandler = ()=>
   {
     const courese = courses.map((course)=>course._id)
     console.log(courses);
   }
  return (
    
    <div>
      <p>Total:</p>
      <p> Rs. {total} </p>
      <p>Rs.3500</p>
      <IconBtn text={"Buy Now"} onclick={bayhandler}></IconBtn>
    </div>
  )
}
