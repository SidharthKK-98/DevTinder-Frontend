import { createSlice } from "@reduxjs/toolkit";

const chatSlice=createSlice({

    name:"chat",
    initialState:[],
    reducers:{
        addOnlineUsers:(state,action)=>action.payload
    }
})

export const {addOnlineUsers}=chatSlice.actions
export default chatSlice.reducer
