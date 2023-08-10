import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { deleteAccount } from '../../../../services/operations/settingsAPI'
import {RiDeleteBin6Line} from "react-icons/ri"
import ConfirmationModal from '../../../comman/ConfirmationModal'
import { logout } from '../../../../services/operations/authAPI'
import { useState } from "react"

export default function DeleteAccount() {

  const {token } = useSelector((state)=>state.auth);
  const navigate= useNavigate()
  const dispatch = useDispatch()
  console.log("deletrd token",token)

  // conformation model 
  const [confirmationModal, setConfirmationModal] = useState(null);

  // const clickHandler = ()=>{
  //   try {
  //     dispatch(deleteAccount(token))
  //     dispatch(logout(navigate))
      
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // }


  return (
    <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">

    <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
      <RiDeleteBin6Line className="text-3xl text-pink-200" />
    </div>

        <div className="flex flex-col space-y-2">

        <h2 className="text-lg font-semibold text-richblack-5">
       Delete Account</h2>

       <div className="w-3/5 text-pink-25">
         <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
       </div>

        
        <button  onClick={() =>
              setConfirmationModal({
                text1: "Are You Sure ?",
                text2: "You will be delete your Acount",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(deleteAccount(token,navigate)),
                btn2Handler: () => setConfirmationModal(null),
                 
              })} 
              className="w-fit cursor-pointer italic text-pink-300"
               >I want to delete my account.</button>
      </div>

      
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}
