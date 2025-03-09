import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../src/API/axiosInterceptor";

export const addToWishlist=createAsyncThunk('add/wishlist',async(data,{ rejectWithValue })=>{
    const {id,item}=data;
    const productId=item._id
    try {
       await axiosInstance.post(`/user/wishlist/${id}`,{productId});
        toast.success(`${item.name} added to wishlist`); 
        const response=await axiosInstance.get(`/user/wishlist/${id}`);
        return response.data;
    } catch (error) {
        
        return rejectWithValue(error.response?.data || "Failed to add to wishlist");
    }
})
export const getWishlist=createAsyncThunk('get/wishlist',async(id,{ rejectWithValue })=>{
    
    try {
        const response=await axiosInstance.get(`/user/wishlist/${id}`);
        
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to get wishlist");
    }
})
export const removeWishlist=createAsyncThunk('remove/wishlist',async(data,{ rejectWithValue })=>{
    const {id,item}=data;
    const productId=item.productId._id
    try {
        await axiosInstance.delete(`/user/wishlist/${id}`,{data:{productId}});
        toast.success(`${item.productId.name} removed from wishlist`);
        const res=await axiosInstance.get(`/user/wishlist/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to remove from  wishlist");
    }
})
const initialState={
    wishlist:[],
    isLoading:false,
    isError:false,
    isLogged:false,
    id:null,
    isPending:false
}
const cartSlice=createSlice({
    name:'wishlist',
    initialState,
 
    extraReducers:(builder)=>{
        builder.addCase(getWishlist.fulfilled,(state,{payload})=>{
          const {products}=payload?.data;
          state.wishlist=products;
            state.isLoading=false;
            state.isError=false;
        })
        .addCase(getWishlist.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getWishlist.rejected,(state)=>{
            state.isError=true;
            state.isLoading=false;
            toast.error(action.payload)
    }).addCase(addToWishlist.fulfilled,(state,{payload})=>{
        state.isPending=false;
        const {products}=payload?.data;
          state.wishlist=products;
    }).addCase(addToWishlist.rejected,(state,action)=>{
        state.isPending=false;
        toast.error(action.payload)
    })
    .addCase(addToWishlist.pending,(state,action)=>{
        state.isPending=true
    })
    .addCase(removeWishlist.fulfilled,(state,{payload})=>{
        state.isPending=false;
        const {products}=payload?.data;
          state.wishlist=products;
    })
    .addCase(removeWishlist.rejected,(state,action)=>{
        toast.error(action.payload)
    })
   
    }
})
// export const { checkUserLogin, userLogout } = cartSlice.actions;
export default cartSlice.reducer;
