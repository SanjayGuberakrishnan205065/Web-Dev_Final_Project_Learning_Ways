
import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { authEndpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESET_PASSWORD_TOKEN_API,
  RESET_PASSWORD_API
} = authEndpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function login(email, password, navigate) {
  return async (dispatch) => {

    // display loding toast on screen while the not get respomse fron the backend  and store its id 
    const toastId = toast.loading("Loading...")
    // set loading true 
    dispatch(setLoading(true))

    try {

      // call the api connector function of services 
      // and send the request to server (backend) with required parameter 
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      // if response not get then throw error
      if (!response.data.success) {
        throw new Error(response.data.message)
      }


      // when get successfull response 
      toast.success("Login Successful")

      // set the token for ferther uses
      dispatch(setToken(response.data.token))

      // this is for the profile image of user if present in image otherwise create and set in useer info
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))

      // set the localStorage in that set the reciveded token with convert into string fron the response
      // localStorage.setItem("token", JSON.stringify(response.data.token))

      // endd of above all process navigate to dash board my profile section 
      navigate("/dashboard/my-profile")
      // navigate("/")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      console.error(error);

      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}


export function getPasswordResetToken(email, setEmailSent)
{
  return async (dispatch)=>{
    dispatch(setLoading(true))
   
    try {
      const response = await apiConnector("POST", RESET_PASSWORD_TOKEN_API,{email});

      console.log("RESET PASSWORD RESPONSE..........",response)
    
      if(!response.data.success)
      {
        throw new Error(response.data.message)
      }

      toast.success("Reset  Email Sent")
      setEmailSent(true);

    } catch (error) {

      console.log("RESET PASSWORD TOKEN ERROR .........",error)
      
    }
    dispatch(setLoading(false));
  }

}


export function resetPassword (password, confirmPassword, token )
{
  return async (dispatch)=>{
    dispatch(setLoading(true));
    try {
      
      const response = await apiConnector("POST", RESET_PASSWORD_API,{password,confirmPassword,token});
      console.log("RESET PASSWORD RESPONSE.....",response);

      if(!response.data.success)
      {
        throw new Error("RESET PASSWORD ERRPR",response.data.error)
      }
      toast.success("Password has been reset successfully")
    } catch (error) {
      
      console.log("RESET PASSWORD ERROR .........",error);
      toast.error("Unable to reset password")

      
    }
    dispatch(setLoading(false));
  }

}