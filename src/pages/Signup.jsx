import React from 'react'

import signupImg from "../assets/Images/signup.webp"

import Template from "../components/core/Auth/Template"

export default function Signup() {
  return (

    //send all requird information to template 
    //this is common template for the sign up and login page 
    
   
    <Template
    title="Join the millions learning to code with StudyNotion for free"
    description1="Build skills for today, tomorrow, and beyond."
    description2="Education to future-proof your career."
    image={signupImg}
    formType="signup"
  />
  )
}
