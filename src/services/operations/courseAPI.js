import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";

import { courseEndpoints } from "../apis";

const {
  COURSE_CATEGORIES_API,
  CREATE_COURSE_API,
  UPDATE_COURSE_API,
  DELETE_COURSE_API,

  GET_FULL_COURSE_API,
  GET_COURSE_DETAILS_API,

  CREATE_SECTION_API,
  UPDATE_SECTION_API,
  DELETE_SECTION_API,

  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SUBSECTION_API,

  GET_INSTRUCTOR_COURSES_API,
  LECTURE_COMPLETION_API,
  CREATE_RATING_API,

  DUMMY_API,
} = courseEndpoints;

// fetch the avialable categories
export const fetchCourseCategories = async () => {
  let result = [];

  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);
    console.log("Course_Category_Api ......", response);

    if (!response.data.success) {
      throw new Error("Could Not Fetch Course Categories");
    }
    result = response?.data?.cataegory;
  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  return result;
};

// course details for unauthorize user 
export const getCourseDetails= async (courseId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
     GET_COURSE_DETAILS_API, 
      {
        courseId,
      }
    )
    console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR............", error)
    result = error.response.data
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}


// course details for authentic user 
export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
     GET_FULL_COURSE_API, 
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// Full course details fetched
export const fetchFullCourse  = async (courseId, token)=>{

  // let result = null;
  // const toastId = toast.loading("Loading...");
  // console.log("co",courseId)
  // try {
  //   const response = await apiConnector("GET", GET_FULL_COURSE_API, {courseId}, {
  //     Authorization: `Bearer ${token}`,
  //   });

  //   console.log("GET FULL COURSE API RESPONSE............", response);
  //   if (!response?.data?.success) {
  //     throw new Error("Could Not get Course");
  //   }
  //   // toast.success("Course Section Created");
  //   result = response?.data?.data;
  // } catch (error) {
  //   console.log("GET FULL COURSE API ERROR............", error);
  //   toast.error(error.message);
  // }
  // toast.dismiss(toastId);
  // return result;
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "GET",
     GET_FULL_COURSE_API,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
  
}

// Create course
export const addCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading....");

  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Contenet-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_COURSE_API RESPONSE ......", response);

    if (!response.data.success) {
      throw new Error("Could Not Add Course Details");
    }

    toast.success("Course Details Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE_COURSE API ERROR............", error);
    toast.error("Can not create course");
  }
  toast.dismiss(toastId);
  return result;
};

// update course

export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("EDIT COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details");
    }
    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};



//create Section
export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
     
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not create Section");
    }
    toast.success("Course Section Created");
    result = response?.data?.updatedCourse;
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

//update Section
export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section");
    }
    toast.success("Section Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

// delete Section
export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not delete Section");
    }
    toast.success("Section deleted Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("SECTION DELETE API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};


// create Section 
export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    console.log("Create Subsection data", data)
  
    const response = await apiConnector("POST",CREATE_SUBSECTION_API, data, {
      "Contenet-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE SUBSECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not create Subsection ");
    }
    toast.success("Subsection created");
    result = response?.data?.data;
    // result = fetchFullCourse(data.courseId, token)
  } catch (error) {
    console.log("CREATE SUBSECTION API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST",UPDATE_SUBSECTION_API, data, {
      "Contenet-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE SUBSECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update SubSection");
    }
    toast.success("SubSection Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE SUBSECTION API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (data,token)=>{

  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE SUBSECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not delete Section");
    }
    toast.success("SubSection deleted Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("SUBSECTION DELETE API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;

}



export const fetchInstructorCourses = async (token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("GET",GET_INSTRUCTOR_COURSES_API ,null,{
      Authorization: `Bearer ${token}`,
    });
    console.log("GET INSTRUCTOR COURSES API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not get any courses");
    }
    // toast.success("Coursrs Fetched Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("GET INSTRUCTOR COURSES API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};



// delete a course
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted Successfully")
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.response.data.message)
    // toast.success("Course Deleted ")

  }
  toast.dismiss(toastId)
}


//mark lecture as completed 
export const markLectureAsComplete = async (data, token)=>{
  let result = null;
  console.log("dataaat",data)

  const toastId  = toast.loading("Loading....")
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.response.data.message)
    result = false
  }
  toast.dismiss(toastId)
  return result

}

// create reating 

export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
  return success
}
