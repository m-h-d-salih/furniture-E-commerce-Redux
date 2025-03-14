import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../src/API/axiosInterceptor";
import toast from "react-hot-toast";



export const getOrder=createAsyncThunk('get/order',async(id,{ rejectWithValue })=>{
    
    try {
        const response=await axiosInstance.get(`/user/order/${id}`);
        
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to get order");
    }
})

const initialState={
    order:[],
    isLoading:false,
    isError:false,
    isPending:false
}
const orderSlice=createSlice({
    name:'order',
    initialState,
 
    extraReducers:(builder)=>{
        builder.addCase(getOrder.fulfilled,(state,{payload})=>{
            state.order=payload?.data;
        //   state.order=products;
            state.isLoading=false;
            state.isError=false;
        })
        .addCase(getOrder.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getOrder.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            toast.error(action.payload)
    })
    }
})
// export const { checkUserLogin, userLogout } = cartSlice.actions;
export default orderSlice.reducer;
