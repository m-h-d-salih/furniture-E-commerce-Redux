import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:[],
    isLoading:false,
    isError:false,
}
const userSlice=createSlice({
    name:'user',

})