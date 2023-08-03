
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

export default function ForgotPassword() {
  
  //here we render the two page
  // one is reset your password and other is check your mail 
  // on the bases of mail sent of not 
  
  const [ emailSent , setEmailSent] = useState(false);
  const [email , setEmail] = useState("");
  const {loading} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit= (e)=>{
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent));

  }
    return (
    <div className=' text-richblack-500 flex items-center justify-center'>
    {
        // check loding true or false 
        loading ?(<div>Loading...</div>):
        (
        // on the basis of email sent below steps 
        <div>
        <h1>
            {
                !emailSent?"Reset your password":"Cheak Your Email"
            }
        </h1>
        <p>
            {
                !emailSent
                ? `Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery`
                :`We have sent the reset email to
                    ${email}`
            }
        </p>

        <form onSubmit={handleOnSubmit}>
            {
                !emailSent&&
                (
                    <label>
                        <p>Email Address</p>
                        <input
                            required
                            type='email'
                            name='email'
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            placeholder='Enter Your Email Address'
                        />
                    </label>
                )
            }
            <button type=' submit'>
                {
                    !emailSent? "Reset Password ": "Resend Email"

                }
            </button>
        </form>

        <div>
            <Link to={"/login"}>
            <p> Back to Login</p>

            </Link>
        </div>
             
        </div>
        )
    }

    </div>
  )
}
