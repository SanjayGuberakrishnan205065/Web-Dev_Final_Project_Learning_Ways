import React from "react";

import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseAPI";

import { setCourse } from "../../../../../slices/courseSlice";
import ConfirmationModal from "../../../../comman/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";


export default function NestedView({ handleChangeEditSectionName }) {
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [addSubsection, setAddSubsection] = useState(null);
  const [viewSubsection, setViewSubsection] = useState(null);
  const [editSubsection, setEditSubsection] = useState(null);

  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null);

  // delete section handle
  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });

    if (result) {
      dispatch(setCourse(result));
    }
    // reset the confirmation modal
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({
      subSectionId,
      sectionId,
      token,
    });

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null);
  };

  return (
    <div>
     <div
        className="rounded-lg bg-richblack-800 p-6 px-8"
        id="nestedViewContainer"
      >
        {course.courseContent?.map((section) => (
          <details key={section._id} open>
            {/* section part  */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              {/* section heading and dropdown  */}
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-100">{section.sectionName}</p>
              </div>

              {/* edit and delete button  */}
              <div className="flex items-center gap-x-3">
                <button
                  onClick={()=>handleChangeEditSectionName(
                    section._id,
                    section.sectionName
                  )}
                >
                   <MdEdit className="text-xl text-richblack-300" />
                </button>

                <button
                  onClick={()=>setConfirmationModal({
                    text1: "Delete This Section?",
                    text2: "All the lecture in this section will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })}
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300" />
                </button>

                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`text-xl text-richblack-300`} />
              </div>
            </summary>





            {/* Subsection Part  */}
            <div className="px-6 pb-4">

             {/* one sbsection  */}
              {section.subSection.map((data) => (
               <div
                  key={data?._id}
                  onClick={() => setViewSubsection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"  >


                  {/* // title  */}
                  <div className="flex items-center gap-x-3 py-2 ">
                  <RxDropdownMenu className="text-2xl text-richblack-50" />
                  <p className="font-semibold text-richblack-50">
                   {data.title}</p>
                  </div>



                 {/* subsection add and delete buttom  */}
                  <div 
                  onClick={(e)=>e.stopPropagation()} // this is for not effecet of onclick of above main subsection div that is setViewSection 
                  className=" flex  items-center gap-x-3">
                  <button
                  onClick={()=>setEditSubsection({...data,sectionId:section._id})}
                  >
                      <MdEdit className="text-xl text-richblack-300" />

                  </button>

                  <button
                  onClick={()=>setConfirmationModal({
                    text1: "Delete This SubSection?",
                    text2: "Selected Subsection will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () =>handleDeleteSubSection(data._id,section._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })}
                >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                </button>


                  </div>
                </div>
              ))}


              {/* add lecture button  */}
              <button                
               className="mt-3 flex items-center gap-x-1 text-yellow-50"

              onClick={()=>setAddSubsection(section._id)}
              
              >
              <FaPlus className=" text-lg"></FaPlus>
              <p>Add Lecture</p>

              </button>


            </div>

          </details>
        ))}
      </div>



      {/* Modal Display */}
      {addSubsection ? (
        <SubSectionModal
          modalData={addSubsection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubsection ? (
        <SubSectionModal
          modalData={viewSubsection}
          setModalData={setViewSubsection}
          view={true}
        />
      ) : editSubsection ? (
        <SubSectionModal
          modalData={editSubsection}
          setModalData={setEditSubsection}
          edit={true}
        />
      ) : (
        <></>
      )}
      {/* Confirmation Modal */}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}

      
    </div>
  );
}


