import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from 'react-rating-stars-component'
import IconBtn from "../../comman/IconBtn";


export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const {courseEntireData} = useSelector((state)=>state.viewCourse)
  
  const {register,handleSubmit,setValue,formState:{errors}}=useForm();

  //set rating and review as empty at first render

  useEffect(()=>
  {
    setValue("courseRating",0)
    setValue("courseReview","")

  },[])

  const ratingChange = (newRating)=>{
    setValue("courseRating",newRating);
  }


  const  onSubmit = async (data)=>{
    
    const res = await createRatingReview(
      {
        courseId:courseEntireData?._id,
        rating:data.courseRating,
        review:data.courseReview
      },
      token
    )
setReviewModal(false)



  }
  return (
    <div>
      <div>

        {/* header of modal  */}
        <div>
          <p>Add Review</p>
          <button onClick={setReviewModal(false)}>close</button>
        </div>

        {/* modal body */}
        <div>
        <div>
          <img
            src={user?.image}
            alt="User Img"
            className=" aspect-square w-[50px] rounded-full object-cover"
          />
          <div>
            <p>
              {user?.firstName} {user?.lastName}
            </p>
            <p>Posting Publicly</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
       <ReactStars
       onChange={ratingChange}
       size={24}
       count={5}
       activeColor="#ffd700"
       />
       <div>
        <label htmlFor="review"> Add your Experience <sup>*</sup></label>
        <textarea
          id="review"
          placeholder="Add your review"
          {...register("courseReview",{required:true})}
        />
        {errors.courseReview&&(
          <span > Please Add Your Review </span>
        )}
       </div>

       <div>
        <button>
          Cancel
        </button>
        <IconBtn text={"Save"}/>
       </div>


        </form>


        </div>

      </div>
    </div>
  );
}
