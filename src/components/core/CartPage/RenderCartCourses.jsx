import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { removeFromCart } from '../../../slices/cartSlice'
import ReactStars from "react-rating-stars-component";

export default function RenderCartCourses() {
    const {cart}= useSelector((state)=>state.cart)
    const dispatch =useDispatch();
  return (
    <div>
    {
        cart.map((course,index)=>
        {
            <div>
                <div>
                    <img src={course?.thumbNaill}/>
                    <div>
                        <p>{course?.courseName}</p>
                        <p>{course?.category?.name} </p>

                        {/* reating hard code  */}
                        <div>
                        <span>4.5</span>
                        <ReactStars
                        count={5}
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        emptyIcon={<GiNinjaStar/>}
                        fullIcon={<GiNinjaStar/>}

                        />
                        <span> {course?.rating?.length } Ratings </span>

                        </div>
                    </div>
                </div>
                <div>
                    <button
                    onClick={()=>dispatch(removeFromCart(course._id))}>
                    <RiDeleteBin6Line/>
                    <span>
                        Remove
                    </span>

                    </button>
                    <p>{course?.price} </p>
                </div>
                
            </div>
        })
    }

    </div>
  )
}
