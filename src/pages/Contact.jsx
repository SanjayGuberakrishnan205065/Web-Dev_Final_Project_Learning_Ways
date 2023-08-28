import React from 'react'
import ContactForm from '../components/core/ContactPage/ContactForm'
import Footer from '../components/comman/Footer'
import ContactDetails from '../components/core/ContactPage/contactDetails'
import ReviewSlider from '../components/comman/ReviewSlider'

export default function Contact() {
  return (
    <div>

      <div className="mx-auto pt-24 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">

      {/* contact details  */}
      <div className="lg:w-[40%]">
          <ContactDetails />
        </div>


      

      {/* contact form     */}
      <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>

     <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

     <Footer/>
    </div>
  )
}
