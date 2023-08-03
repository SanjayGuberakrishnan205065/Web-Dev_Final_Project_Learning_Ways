const BASE_URL = process.env.REACT_APP_BASE_URL


// Auth Endpoints 

export const authEndpoints ={
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    RESET_PASSWORD_TOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESET_PASSWORD_API :BASE_URL + "/auth/reset-password"
   
}