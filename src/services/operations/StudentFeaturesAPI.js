import { studentEndpoint } from "../apis";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import RZPLogo from '../../assets/Logo/razorpay-glyph.svg'
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";



const { COURSE_PAYMENT_API,
    COURSE_VERIFY_API, 
    SEND_PAYMENT_SUCCESS_EMAIL_API
}=studentEndpoint


// adding the razorpay script in html file that is required for payment prossess 

function loadScript (src){
    return new Promise((resolve)=>{

        // add element in html
        const script = document.createElement("script")
        // set src to that elemrnt 
        script.src=src;

       //if the element is load thaen return true 
        script.onload=()=>{
            resolve(true);
        }
        // when error occure then send false 
        script.onerror=()=>{
            resolve(false)
        }
        document.body.appendChild(script)
    })
}


export async function  buyCourse (token,courses,userDetails, navigate,dispatch){
    const toastId = toast.loading("Loading...")
    try {

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res)
        {
            toast.error("RazorPay SDK failed to laod");
            return
        }

        // initilize the order 
        const orderResponse = await apiConnector(
            "POST",
             COURSE_PAYMENT_API,
             {courses},
             {
                Authorization :`Bearer ${token}`
             }
        )

        if(!orderResponse)
        {
            throw new Error(orderResponse.data.message)
        }

        // option create for Rozor pay 

        const options = {
            key: process.env.RAZORPAY_KEY ,
            currency : orderResponse.data.data.currency ,
            amount: orderResponse.data.data.amount,
            order_id:orderResponse.data.data.id ,
            name: "Learning Ways",
            description: "Thank you for purchasing the course.",
            image: RZPLogo,
            prefill:{
                name:`${userDetails.firstName} ${userDetails.lastName}`,
                email:userDetails.email
            } ,
            handler:function(response) {
                // send email
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token)
                // verify payment 
                verifyPayment({...response, courses},token,navigate,dispatch)
            },

        }

        // create object of razor pay 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open()
        paymentObject.on("payment.failed",function(response){
            toast.error("Oops, payment failed");
            console.log(response.error)
        })

    } catch (error) {
        console.log("PAYMENT API ERROR....",error)
        toast.error("Could not make Payment")
        
    }
    toast.dismiss(toastId)
}

async function sendPaymentSuccessEmail(response,amount,token){
    try {
      const res =   await apiConnector(
            "POST",
            SEND_PAYMENT_SUCCESS_EMAIL_API,
            {orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount,},
            {
                Authorization:`Bearer ${token}`
            }
            )

    console.log("SEND PAYMENT SUCCESS EMAIL RESPONSE...",res)
        
    } catch (error) {

        console.log("error", error.message)

        console.log('PAYMENT SUCCESS EMAIL Error....',error)
        
    }
}

async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId = toast.loading("Verifying Payment.....");
    // loading true for paynemt it is present in course slice 
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            bodyData,
            {Authorization: `Bearer ${token}`}
        )

        if(!response.data.success)
        {
            throw new Error(response.data.message)
        }
        toast.success("Payment Successfull, You added in course")
        navigate("/dashboard/enrolled-courses")

        // remove all  courses from cart 
        dispatch(resetCart())
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR...",error)
        toast.error("Could not Verify Payment")
        
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false))

}