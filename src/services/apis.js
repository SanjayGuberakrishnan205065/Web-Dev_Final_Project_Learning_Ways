const BASE_URL = process.env.REACT_APP_BASE_URL;

// Auth Endpoints

export const authEndpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESET_PASSWORD_TOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESET_PASSWORD_API: BASE_URL + "/auth/reset-password",
};

// Profile Endpoints
export const profileEndpoints = {
  CONTACT_US_API: BASE_URL + "/profile/contactUs",
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses"

};

// Setting Endpoints

export const settingsEndpoints = {
  UPDATE_PROFILE_PICTURE_API: BASE_URL + "/profile/updatedProfilePicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/profile/changePassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteAccount",
};


// Course Endpoints 

export const courseEndpoints ={
  
  COURSE_CATEGORIES_API : BASE_URL + "/course/showAllCategories",

  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  UPDATE_COURSE_API: BASE_URL +"/course/updateCourse",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_API: BASE_URL + "/course/getFullCourseDetails",
  GET_COURSE_DETAILS_API:BASE_URL + "/course/getCourseDetails",

  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  DELETE_SECTION_API : BASE_URL + "/course/deleteSection",

  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",

  GET_INSTRUCTOR_COURSES_API:BASE_URL+"/course/getInstructorCourses",



}

export const catalogData = {
  CATALOGPAGEDETAILS_API:BASE_URL + "/course/getCategoryPageDetails"
}

export const  studentEndpoint = {
  COURSE_PAYMENT_API:BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API:+ "/payment/sendPaymentSuccessMail",
}