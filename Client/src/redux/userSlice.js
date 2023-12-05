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
  },
});
export const {
  signInStart,
  signSuccess,
  signInFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
} = userSlice.actions;

export default userSlice.reducer;
