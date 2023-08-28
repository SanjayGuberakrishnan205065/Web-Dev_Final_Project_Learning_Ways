import axios from "axios"
export const axiosInstance = axios.create({});
// this is the most importent patr that is connection of back end and frontend 
export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}


