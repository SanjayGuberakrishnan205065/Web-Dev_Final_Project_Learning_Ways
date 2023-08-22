import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    courseSectionData :[],
    CourseEntireData:[],
    completedLectures:[],
    totalLectures:0,
}

const viewCourseSlice = createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        setCourseSectionData:(state,action)=>{
            state.courseSectionData=action.payload
        },
       setEntireCourseData:(state,action)=>{
            state.CourseEntireData=action.payload
        },
       setTotalLectures:(state,action)=>{
            state.totalLectures=action.payload
        },
       setCompletedLectures:(state,action)=>{
            state.completedLectures=action.payload
        },
        updateCompletedLectures:(state,action)=>{
            state.completedLectures=[...state.completedLectures,action.payload]
        },
    },
})



export const {
    setCourseSectionData,
    setEntireCourseData,
    setTotalLectures,
    setCompletedLectures,
    updateCompletedLectures,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer

