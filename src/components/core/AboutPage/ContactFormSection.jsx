import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

export default function ContactFormSection() {
  return (
    <div className=' mx-auto  border-[0.12rem] border-richblack-800 rounded-lg p-12'>
         <h1 className="text-center text-4xl font-semibold"> Get in Touch </h1>
         <p className="text-center text-richblack-300 mt-3"> We'd love to here for you, please fill out this form.</p>
         <div className="mt-12 mx-auto">
        <ContactUsForm></ContactUsForm>
       </div>

    </div>
  )
}
