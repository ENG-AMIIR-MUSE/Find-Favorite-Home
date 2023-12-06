import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signSuccess: (state, action) => {
      (state.loading = false), (state.currentUser = action.payload);
    },
    signInFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false 
      state.currentUser = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.loading = false
      state.error = action.payload;
    },
    deleteUserStart:(state)=>{
      state.loading = true
    },
    deleteUserSuccess:(state,action)=>{
      state.currentUser  = null, 
      state.loading = false 
      state.error = null
    
      
      
    },
    deleteUserFailure:(state,action)=>{
      state.loading = false,
      state.error = action.payload
    }
  },
});
export const {
  signInStart,
  signSuccess,
  signInFailure,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,

} = userSlice.actions;

export default userSlice.reducer;
