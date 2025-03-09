import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../src/API/axiosInterceptor";


export const getUser=createAsyncThunk('get/user',async({id})=>{
    
    try {
        const response=await axiosInstance.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
})
const initialState={
    user:[],
    isLoading:false,
    isError:false,
    isLogged:false,
    id:null
}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        checkUserLogin:(state,action)=>{
          state.user=action.payload;
            state.isLogged=true;
            state.id=localStorage.getItem('id');
        },
        userLogout:(state)=>{
            state.isLogged=false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getUser.fulfilled,(state,{payload})=>{
            const {user}=payload;
            state.user=user;
        })
    }
})
export const { checkUserLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
