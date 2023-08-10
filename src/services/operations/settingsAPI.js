import {toast} from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"




const {
    UPDATE_PROFILE_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoints


// export function updateProfilePicture (token, formData)
export function updateProfilePicture (token, FormData)
{
return async (dispatch) =>{
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector (
            "PUT" ,
             UPDATE_PROFILE_PICTURE_API, 
            FormData,
        { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        }
        );
       

        console.log(" UPDATE_PROFILE_PICTURE RESPONSE...................", response)

        if(!response.data.success)
        {
            throw new Error(response.data.message)
        }
        toast.success("Profile Picture Updated Successfully")
        dispatch(setUser(response.data.data))
        localStorage.setItem("user", JSON.stringify(response.data.data))
        console.log(response.data.data);
        
    } catch (error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
        toast.error("Could Not Update Display Picture")
        
    }
    toast.dismiss(toastId)


}
}

export function updateProfile (token, FormData)
{
return async (dispatch) =>{
    const toastId = toast.loading("Loading...")
    try {
       
        const response = await apiConnector (
            "PUT" ,
             UPDATE_PROFILE_API, 
            FormData,
        { 
            Authorization: `Bearer ${token}`,
        }
        );
       

        console.log(" UPDATE_PROFILE_PICTURE RESPONSE...................", response)

        if(!response.data.success)
        {
            throw new Error(response.data.message)
        }
        
        toast.success("Profile Updated Successfully")
        dispatch(setUser(response.data.updatedUser))
        localStorage.setItem("user", JSON.stringify(response.data.updatedUser))

        
    } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
        
    }
    toast.dismiss(toastId)


}
}



export function changePassword (token,formData){

    const toastId = toast.loading("Loading...")
    return async (dispatch)=>{
        try {

            const response = await apiConnector (
                "PUT",
                CHANGE_PASSWORD_API,
                formData,
                {
                    Authorization:`Bearer ${token}`
                }
            
            )

            console.log("CHANGED PASSWORD RESPONSE .............",response)

            if(!response.data.success)
            {
                throw new Error(response.data.message)
            }

            toast.success("Password Changed")
            
        } catch (error) {
            console.log("CHANGED_PASSWORDAPI ERROR............", error)
            toast.error("Could Not change Password")
            
        }
        toast.dismiss(toastId);
    }

}


export function deleteAccount(token,navigate){

    const toastId = toast.loading("Loading...")
    return async (dispatch)=>{
        try {

            const response = await apiConnector (
                "DELETE",
                DELETE_PROFILE_API,
                null,
                {
                    Authorization:`Bearer ${token}`
                }
            
            )

            console.log("DELETE ACCOUNT RESPONSE .............",response)

            if(!response.data.success)
            {
                throw new Error(response.data.message)
            }
           
            dispatch(logout(navigate));
            navigate("/signup")

            toast.success("Account Deleted")
            
            
        } catch (error) {
            console.log("DELETE ACCOUNT ERROR............", error)
            toast.error("Could Not Delete Account")
            
        }
        toast.dismiss(toastId);
    }

}
