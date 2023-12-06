import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  loading: false,
  errro: null,
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
      (state.loading = false), (state.errro = action.payload);
    },
    updateProfileStart: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false, state.currentUser = action.payload;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false, 
      state.error = action.payload;
    },
    deleteProfileStart:(state)=>{
      state.loading = true
    },
    deleteProfileSuccess:(state)=>{
      state.currentUser  = null, 
      state.loading = false 
      
      
    },
    deleteProfileFailiure:(state,action)=>{
      state.loading = false,
      state.error = action.payload
    }
  },
});
export const {
  signInStart,
  signSuccess,
  signInFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  deleteProfileStart,
  deleteProfileSuccess,
  deleteProfileFailiure,

} = userSlice.actions;

export default userSlice.reducer;
