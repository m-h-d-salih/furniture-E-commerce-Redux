import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../src/API/axiosInterceptor";
import toast from "react-hot-toast";


export const addToCart=createAsyncThunk('add/cart',async(data)=>{
    const {id,item}=data;
    const productId=item._id
    
    try {
        const response=await axiosInstance.post(`/user/cart/${id}`,{productId});
        toast.success(`Item added to cart`); 
        return response.data;
    } catch (error) {
        toast.error(`something went wrong`)
        console.log(error)
    }
})
export const getCart=createAsyncThunk('get/cart',async(id)=>{
    
    try {
        const response=await axiosInstance.get(`/user/cart/${id}`);
        
        return response.data;
    } catch (error) {
        console.log(error)
    }
})
const initialState={
    cart:[],
    isLoading:false,
    isError:false,
    isLogged:false,
    id:null,
    isPending:false
}
const cartSlice=createSlice({
    name:'cart',
    initialState,
 
    extraReducers:(builder)=>{
        builder.addCase(getCart.fulfilled,(state,{payload})=>{
          const {products}=payload?.data;
          state.cart=products;
            state.isLoading=false;
            state.isError=false;
        })
        .addCase(getCart.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getCart.rejected,(state)=>{
            state.isError=true;
            state.isLoading=false;
    }).addCase(addToCart.fulfilled,(state,action)=>{
        state.isPending=false
    }).addCase(addToCart.rejected,(state,action)=>{
        state.isPending=false
    })
    .addCase(addToCart.pending,(state,action)=>{
        state.isPending=true
    })
    }
})
// export const { checkUserLogin, userLogout } = cartSlice.actions;
export default cartSlice.reducer;
