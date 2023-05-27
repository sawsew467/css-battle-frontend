import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  pageLoading: {
    status: false,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeLoadingStatus: (state, action) => {
        state.pageLoading.status = action.payload

    }
  },
});

// Action creators are generated for each case reducer function
export const { changeLoadingStatus } = appSlice.actions;

export default appSlice.reducer;
