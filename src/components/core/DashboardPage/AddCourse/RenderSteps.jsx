import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishForm from './PublishCourse/index'

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <div className=" text-richblue-100">
      {/* top lavels  */}
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item, index) => (
          <>
            <div className="flex flex-col items-center " key={index}>
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px]
                        ${
                          step === item.id
                            ? " bg-yellow-800 border-yellow-200 text-yellow-100"
                            : " bg-richblack-800 border-richblack-700 text-richblack-300"
                        }
                        ${step > item.id && "bg-yellow-50 text-yellow-50"}`}
               
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-800" />
                ) : (
                  item.id
                )}
              </button>
            </div>

            {/* add dashed line here  */}
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                    step > item.id ? "border-yellow-50" : "border-richblack-500"
                  } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      {/* headinngs */}

      <div className="relative mb-16 flex md:w-full   select-none justify-between">
        {steps.map((item) => {
          return (
            <div key={item.id}
             className="flex md:min-w-[130px] flex-col items-center gap-y-2">
              <p 
               className={`text-sm ${
                  step >= item.id ? "text-richblack-100" : "text-richblack-500"
                }`}
              
              >{item.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* related forms  */}
      <div>
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm/>}
        {step===3 && <PublishForm/>}
      </div>
    </div>
  );
}
