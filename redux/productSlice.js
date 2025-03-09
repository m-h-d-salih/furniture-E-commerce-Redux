import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../src/API/axiosInterceptor";


export const getAllProducts=createAsyncThunk('get/products',async(_,{ rejectWithValue })=>{
    
    try {
        const response=await axiosInstance.get(`/user/products`);
        
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
})
const initialState={
    products:[],
    isLoading:false,
    isError:false,
    isLogged:false,
    id:null
}
const productSlice=createSlice({
    name:'product',
    initialState,
 
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.fulfilled,(state,{payload})=>{
            const {data}=payload;
            state.products=data;
            state.isLoading=false;
            state.isError=false;
        })
        .addCase(getAllProducts.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getAllProducts.rejected,(state)=>{
            state.isError=true;
            state.isLoading=false;
    })
    }
})
// export const { checkUserLogin, userLogout } = productSlice.actions;
export default productSlice.reducer;
