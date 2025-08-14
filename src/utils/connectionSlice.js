import { createSlice } from "@reduxjs/toolkit";

const connectionSlice=createSlice({

    name:"connection",
    initialState:null,
    reducers:{
        addConnection:(state,action)=>action.payload,
        removeConncetion:()=>null

    }
})

export const {addConnection,removeConncetion}=connectionSlice.actions
export default connectionSlice.reducer