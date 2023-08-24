import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { markLectureAsComplete } from "../../../services/operations/courseAPI";
import { BigPlayButton, Player } from "video-react";
import IconBtn from "../../comman/IconBtn";
export default function VideoDetails() {
  // required data
  const { courseId, sectionId, subSectionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const playerRef = useRef(null);
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  // required State
  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  // on changing the url coursedata and section data

  useEffect(() => {
    (async () => {
      // course not avialable
      if (!courseSectionData.length) return;
      // course id section id or subsection id not present
      if (!courseId || !sectionId || !subSectionId) {
        navigate("/course/enrolled-courses");
      } else {
        //all right

        // current section
        const filteredData = courseSectionData.filter(
          (section) => section._id === sectionId
        );
        // current video
        const filteredVideoData = filteredData[0]?.subSection.filter(
          (data) => data._id === subSectionId
        );

        // set value
        setVideoData(filteredVideoData[0]);
        // if video no present use it
        setPreviewSource(courseEntireData.thumbNail);
        setVideoEnded(false);
      }
    })();
  }, [courseEntireData, courseSectionData, location.pathname]);

  // required functions
  const isFirstVideo = () => {
    // find the current section index
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section?._id === sectionId
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data?._id === subSectionId);

    // both above index === 0 then it is first video
    if (currentSectionIndex === 0 && currentSubsectionIndex === 0) {
      return true;
    } else return false;
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section?._id === sectionId
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data?._id === subSectionId);

    const noOfSubsection =
      courseSectionData[currentSectionIndex]?.subSection.length;

    // both above index at n-1 of their array means it is last video

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubsectionIndex === noOfSubsection - 1
    ) {
      return true;
    } else return false;
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section?._id === sectionId
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data?._id === subSectionId);

    const noOfSubsection =
      courseSectionData[currentSectionIndex].subSection.length;

    // current section have next video
    if (currentSubsectionIndex !== noOfSubsection - 1) {
      const nextSubsectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubsectionIndex + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubsectionId}`
      );
    } else {
      // next section first video

      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubsectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`
      );
    }
  };
  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (section) => section?._id === sectionId
    );

    const currentSubsectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data?._id === subSectionId);

    

    // current section have prev video
    if (currentSubsectionIndex !== 0) {
      const prevSubsectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubsectionIndex - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubsectionId}`
      );
    } else {
      // prev section last video

      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;

      const noOfSubsection =
      courseSectionData[currentSectionIndex - 1].subSection.length;
      
      const nextSubsectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          noOfSubsection - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${nextSubsectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    console.log("course", courseId);
    console.log("sub", subSectionId);
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col gap-5 text-white mt-4">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          <BigPlayButton position="center" />

          {/* rendr when video is ended  */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {/* if video is not completed  */}
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={() => handleLectureCompletion()}
                  text={!loading ? "Mark as Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}

              {/* rewatch button  */}
              <IconBtn
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    //set valuse of time of video is 0
                    playerRef?.current?.seek(0);
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPreviousVideo}
                    className=" blackButton"
                  >
                    Previous
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className=" blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
}
