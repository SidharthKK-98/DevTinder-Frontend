import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=> action.payload,
        removeUserFromFeed:(state,action)=>{
            const newFeed = state.data.filter(user=>user._id !== action.payload)
            return {
                ...state,
                data:newFeed}
        }
    }
})

export const {addFeed,removeUserFromFeed}=feedSlice.actions
export default feedSlice.reducer