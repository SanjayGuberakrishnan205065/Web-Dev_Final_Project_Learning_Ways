import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { apiConnector } from "../../../services/apiconnector";
import { profileEndpoints } from "../../../services/apis";
import CountryCode from "../../../data/countrycode.json"

export default function ContactUsForm() {
  // this is loading for  the form information
  const [loading, setloading] = useState(false);

  // required functionality taht provided by the form hook of react library
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  // by using the use effect
  // reset all the parameter when form submit successfully

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        contact: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitContactForm = async (data) => {
    console.log("logging data ", data);
    try {
      setloading(true);
      const response = await apiConnector(
        "POST",
        profileEndpoints.CONTACT_US_API,
        data
      );
      console.log("logging response", response);
      if (!response.data.success) {
        throw new Error("CONTACT US FORM ERROR ", response.data.message);
      }
      setloading(false);
      toast.success("Message recived");
    } catch (error) {
      console.log("Error", error);
      toast.error("Error to recived message ");
    }
  };

  return (
    <form
      className="flex flex-col lg:gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className=" flex flex-col lg:gap-7 gap-2">

        <div className="flex flex-col lg:gap-5 gap-2 lg:flex-row">
          {/* first name  */}
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstName" className="lable-style">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="form-style"
              placeholder="Enter Your First Name"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter First name{" "}
              </span>
            )}
          </div>

          {/* last name  */}
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastName" className="lable-style">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter Your Last Name"
              className="form-style"
              {...register("lastName")}
            />
          </div>
        </div>

        {/* contact  */}

        <div className="flex flex-col gap-2">
          <label htmlFor="contact" className=" lable-style">
            Phone Number
          </label>

          <div className=" flex gap-5">
            <div className=" flex w-[81px] flex-col gap-2">
            <select
                type="text"
                name="cont"
                id="cont"
                className=" form-style"
                {...register("countrycode", {required:true})}
            >
            {
                CountryCode.map((ele, i)=>{
                    return(
                        <option key={i} value={ele.code}>
                    {ele.code}-{ele.country}

                     </option>
                    )
                })
            }
            </select>

            </div>


            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
            name="contact"
            id="contact"
            type="number"
            placeholder="12345 67890"
            className=" form-style"
            {...register("contact", 
            { 
                required:{value:true,
                         message:"Please enter your phone number"},
                maxLength:{value:12, message:"Invalid Phone Number"},
                minLength:{value:10, message:"Invalid Phone Number"}
                         
            })}
        />
            </div>
          </div>

          {errors.contact &&  <span className="-mt-1 text-[12px] text-yellow-100"> {errors.contact.message}</span>}
        </div>






        {/* email  */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="lable-style">
            Email Address
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Enter Your Email"
            className="form-style"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Please enter your Email address </span>}
        </div>

        {/* message  */}
        <div className=" flex flex-col">
          <label htmlFor="message" className="lable-style">
            Message
          </label>
          <textarea
            name="message"
            id="mesage"
            cols={30}
            rows={5}
            placeholder="Enter Your Message Here "
            className="form-style"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Enter something in message{" "}
            </span>
          )}
        </div>


        <button
        disabled={loading}
          type="submit"
          className={`rounded-md bg-yellow-300 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `} >
          Send Message
        </button>
      </div>
    </form>
  );
}
