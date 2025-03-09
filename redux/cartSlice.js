import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../src/API/axiosInterceptor";
import toast from "react-hot-toast";


export const addToCart=createAsyncThunk('add/cart',async(data,{ rejectWithValue })=>{
    const {id,item}=data;
    const productId=item._id
    try {
        await axiosInstance.post(`/user/cart/${id}`,{productId});
        toast.success(`${item.name} added to cart`); 
        const response=await axiosInstance.get(`/user/cart/${id}`);
        return response.data;
    } catch (error) {
        
        return rejectWithValue(error.response?.data || "Failed to add to cart");
    }
})
export const getCart=createAsyncThunk('get/cart',async(id,{ rejectWithValue })=>{
    
    try {
        const response=await axiosInstance.get(`/user/cart/${id}`);
        
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to get  cart");
    }
})
export const removeCart=createAsyncThunk('remove/cart',async(data,{ rejectWithValue })=>{
    const {id,item}=data;
    const productId=item._id
    try {
        await axiosInstance.delete(`/user/cart/${id}`,{data:{productId}});
        toast.success(`${item.name} removed from cart`);
        const res=await axiosInstance.get(`/user/cart/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to remove from  cart");
    }
})
export const updateQuantity=createAsyncThunk('update/cart',async(data,{ rejectWithValue })=>{
    const {id,item,action}=data;
    const productId=item._id
    try {
        await axiosInstance.post(`/user/cart/${id}`,{productId,action});
        toast.success(`updated quantity of ${item.name}`);
        const res=await axiosInstance.get(`/user/cart/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || `Failed to update quantity of ${item.name}`);
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
            toast.error(action.payload)
    }).addCase(addToCart.fulfilled,(state,{payload})=>{
        state.isPending=false;
        const {products}=payload?.data;
          state.cart=products;
    }).addCase(addToCart.rejected,(state,action)=>{
        state.isPending=false;
        toast.error(action.payload)
    })
    .addCase(addToCart.pending,(state,action)=>{
        state.isPending=true
    })
    .addCase(removeCart.fulfilled,(state,{payload})=>{
        state.isPending=false;
        const {products}=payload?.data;
          state.cart=products;
    })
    .addCase(removeCart.rejected,(state,action)=>{
        toast.error(action.payload)
    })
    .addCase(updateQuantity.pending,(state,action)=>{
        state.isPending=true
    })
    .addCase(updateQuantity.fulfilled,(state,{payload})=>{
        state.isPending=false;
        const {products}=payload?.data;
          state.cart=products;
    })
    .addCase(updateQuantity.rejected,(state,action)=>{
        toast.error(action.payload)
    })
    }
})
// export const { checkUserLogin, userLogout } = cartSlice.actions;
export default cartSlice.reducer;
