import React from 'react'

import signupImg from "../assets/Images/signup.jpg"

import Template from "../components/core/Auth/Template"

export default function Signup() {
  return (

    //send all requird information to template 
    //this is common template for the sign up and login page 
    
   
    <Template
    title="Get Learning Ways for free and join the millions of people who are learning to code."
    description1="Develop talents that will be useful in the future."
    description2="Invest in education to secure your career."
    image={signupImg}
    formType="signup"
  />
  )
}
