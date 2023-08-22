import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../comman/IconBtn";

export default function VideoSidebar({ setReviewModal }) {
  const { sectionId, subSectionId } = useParams();
  const {
    courseSctoionData,
    courseEntireData,
    totalLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const navigate = useNavigate();
  const location = useLocation();

  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState();

  // set the active for current video and section highlighted

  useEffect(() => {
    const setActiveFlags = () => {
      // if section is emmpty
      if (!courseSctoionData.length) return;

      // current section
      const currentSectionIndex = courseSctoionData.findIndex(
        (data) => data._id === sectionId
      );

      //current Subsection
      const currentSubsectionIndex = courseSctoionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      // active SubSection

      const activeSubSectionId =
        courseSctoionData[currentSectionIndex]?.subSection[
          currentSubsectionIndex
        ]?._id;

      // set current value
      setActiveStatus(courseSctoionData[currentSubsectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    };

    setActiveFlags();
  }, [courseSctoionData, courseEntireData, location.pathname]);

  return (
    <>
      <div>
        {/* button Heading  */}
        <div>
          {/* buttons */}
          <div>
            <div onClick={() => navigate("/dashboard/enrolled-courses")}>
              Back
            </div>
            <div>
              <IconBtn text={"Add Review"} onclick={setReviewModal(true)} />
            </div>
          </div>
          {/* heading  */}
          <div>
            <p>{courseEntireData.courseName}</p>
            <p>{completedLectures?.length}/{totalLectures.length}</p>
          </div>
        </div>

        {/* section and subsection  */}
        <div>
        {
          courseSctoionData.map((section,index)=>(
            <div
            onClick={()=>setActiveStatus(section?._id)}
            key={index}
            >
             {/* section  */}

             <div>
              <div>{section?.sectionName}</div>
              <div> {">"} </div>
             </div>

             {/* subsection Show for only current Setion lecture  */}
            
              {
                activeStatus===section?._id && (
                  <div className="transition-[height] duration-500 ease-in-out">
                    {
                      section.subSection.map((topic,index)=>(
                        <div
                        className={` flex gap-3 px-5 py-2 ${
                          videoBarActive === topic?._id
                          ?" bg-yellow-200 text-richblack-800 font-semibold"
                          :" bg-richblack-900 text-richblack-100"
                        }`}
                        key={i}
                        onClick={()=>{
                          navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                          setVideoBarActive(topic?._id)
                        }

                        }>
                          <input
                            type="checkbox"
                            checked={completedLectures.includes(topic?._id)}
                            onChange={()=>{}}
                          />
                          <span>{topic.title}</span>
                        </div>
                      ))
                    }
                  </div>

                )

              }
           
            </div>
          ))
        }

        </div>
      </div>
    </>
  );
}
