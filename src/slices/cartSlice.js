import {createSlice} from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

const initialState = {
    cart: localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
    totalItems: localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")): 0,

    // total price
    total: localStorage.getItem("total")?JSON.parse(localStorage.getItem("total")): 0,
}

const cartSclice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
      addToCart:(state,action)=>
      {
        // assign current course 
        const course = action.payload
        const index =state.cart.findIndex((item)=>item._id===course._id)
        //if course already in cart don't modify the cart
        if(index>=0)
        {
            toast.error("Course Already in Cart")
            return;
        }

        // if course not in cart
        // add in cart 
        state.cart.push(course);
        // update total price and total items
        state.total+=course.price;
        state.totalItems++;

        //update the local storage 
        localStorage.setItem("cart",JSON.stringify(state.cart))
        localStorage.setItem("total",JSON.stringify(state.total))
        localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
        toast.success("Course added to Cart")

      },

      removeFromCart :(state,action)=>{

        const courseId = action.payload
        const index = state.cart.findIndex((item)=>item._id===courseId)


        if(index>=0) // course found in cart 
        {
            state.totalItems--;
            state.total -= state.cart[index].price;
            state.cart.splice(index,1)
              // Update to localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        // show toast
        toast.success("Course removed from cart")

        }


      },

      resetCart:(state,action)=>{
        state.cart = []
        state.total = 0
        state.totalItems = 0
        // Update to localstorage
        localStorage.removeItem("cart")
        localStorage.removeItem("total")
        localStorage.removeItem("totalItems")

      }



    }
})

export const {addToCart,removeFromCart,resetCart} = cartSclice.actions;

export default cartSclice.reducer