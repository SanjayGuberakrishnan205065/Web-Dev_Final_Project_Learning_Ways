import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import RequirementField from "./RequirementField";
import { MdNavigateNext } from "react-icons/md"
import ChipInput from "./ChipInput";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";

import {
  fetchCourseCategories,
  editCourseDetails,
  addCourseDetails,
} from "../../../../../services/operations/courseAPI";
import { setCourse, setStep,setTrackCourseUpdate } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../comman/IconBtn";
import Upload from "../Upload";

export default function CourseInformationForm() {
  // form hook
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // Required Things
  const dispatch = useDispatch();
  const { step, course, editCourse, trackCourseUpdate } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  // for option in form
  const [couresCategories, setCourseCotegories] = useState([]);

  // get course Category from backend
  const getCategories = async () => {
    setLoading(true);
    const categories = await fetchCourseCategories();
    if (categories.length > 0) {
      setCourseCotegories(categories);
    }
    setLoading(false);
  };

  // to call external data and apies

  useEffect(() => {
    // when you edit the course that time you need the set all value
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDes", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("benefit", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thimbNail);
    }

    getCategories(); // get categoryy from server
  }, []);

  // check  for form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDes !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString()||
      currentValues.benefit !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequiremwnts.toString() !==course.instructions.toString()||
      currentValues.courseImage !== course.thimbNail
    ) {
      return true;
    } else return false;
  };

  // submiting form
  const onSubmit = async (data) => {
    // form is on editiable  mode
    if (editCourse) {
      // check for actualy form is updated
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);

        // check for all value of currentvalues if change then appen in form
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDes);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (currentValues.benefit !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.benefit);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }

        // call the update course server api and add updated details
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setTrackCourseUpdate(!trackCourseUpdate))
          dispatch(setCourse(result));
        } else {
          toast.error("No changes made to the form");
        }
        return;
      }
    }

    // create course mode
    

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDes);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.benefit);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbNailImage", data.courseImage);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
      
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 "
      className="space-y-8  border-[0.12rem] border-richblack-800 rounded-lg lg:p-12 p-5"
    >
      {/* course title  */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseTitle" className=" lable-style">
          {" "}
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Name"
          {...register("courseTitle", { required: true })}
          className=" form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Coures name is Required{" "}
          </span>
        )}
      </div>

      {/* course des  */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseShortDes" className=" lable-style">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDes"
          placeholder="Enter Description "
          {...register("courseShortDes", { required: true })}
          className=" form-style min-h-[130px] resize-x-none w-full"
        />
        {errors.courseShortDes && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Coures name is Required{" "}
          </span>
        )}
      </div>

      {/* course price  */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="coursePrice" className=" lable-style">
          Course Price<sup className="text-pink-200">*</sup>
        </label>
        <div className=" relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className=" form-style  w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Coures Price is Required
          </span>
        )}
      </div>

      {/* course category  */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCategory" className=" lable-style">
          {" "}
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue={""}

          {...register("courseCategory", { required: true })}
          className=" form-style w-full "
        >
          <option value={""} disabled className=" form-style text-richblack-300  ">
            Choose a Category
          </option>

          {!loading &&
            couresCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>

        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Coures Category is Required{" "}
          </span>
        )}
      </div>

      {/* create the custom componenet for tag  */}


      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter the tags and press enter "
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* create a component for uploading and showing that  */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbNail : null}
      />

      {/* benifit of the course  */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="benefit" className=" lable-style">
          {" "}
          Benefits of the Course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="benefit"
          placeholder="Enter Benifits of Course "
          {...register("benefit", { required: true })}
          className=" form-style resize-x-none min-h-[130px] w-full:"
        />
        {errors.benifit && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benifits of Coures is Required{" "}
          </span>
        )}
      </div>

      {/* instruction  */}
      <RequirementField
        name="courseRequirements"
        label="Requirement"
        placeholder="Enter the Requirement for Couerse  "
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* next button  */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button onClick={() => dispatch(setStep(2))}
          disabled={loading}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Without Saving
          </button>
        )}

        <IconBtn text={!editCourse ? "Next" : "Save Chnages"} type={"submit"} >
        <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
}
