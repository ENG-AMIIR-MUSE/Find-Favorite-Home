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
      state.loading = false,
       state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {

      
      state.loading = false,
       state.errro = action.payload;
    },
  },
});
export const {signInStart,signSuccess,signInFailure} =  userSlice.actions

export default  userSlice.reducer