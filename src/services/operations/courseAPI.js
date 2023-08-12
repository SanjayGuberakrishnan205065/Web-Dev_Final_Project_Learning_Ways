import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";

import { courseEndpoints } from "../apis";


const {
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    UPDATE_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
  
} = courseEndpoints;



// fetch the avialable categories 
export  const fetchCourseCategories = async ()=>{
    let result = [];

    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API)
        console.log("Course_Category_Api ......",response)

        if(!response.data.success)
        {
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.cataegory
        
    } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
      }
      return result

}


// Create course 
export  const addCourseDetails = async (data, token)=>{
    let result =null;
    const toastId= toast.loading("Loading....")

    try {
        const response = await apiConnector("POST", CREATE_COURSE_API,data,{
            "Contenet-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE_COURSE_API RESPONSE ......",response)

        if(!response.data.success)
        {
            throw new Error("Could Not Add Course Details")
        }
        
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
        
    } catch (error) {
        console.log("CREATE_COURSE API ERROR............", error)
        toast.error(error.message)
      }
      toast.dismiss(toastId)
      return result
    }


    // update course 

    export const editCourseDetails = async (data, token) => {
        let result = null
        const toastId = toast.loading("Loading...")
        try {
          const response = await apiConnector("POST", UPDATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          })
          console.log("EDIT COURSE API RESPONSE............", response)
          if (!response?.data?.success) {
            throw new Error("Could Not Update Course Details")
          }
          toast.success("Course Details Updated Successfully")
          result = response?.data?.data
        } catch (error) {
          console.log("EDIT COURSE API ERROR............", error)
          toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result
      }


