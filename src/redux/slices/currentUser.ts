import { createSlice } from "@reduxjs/toolkit";

export interface User {
  username: string;
  password: string;
  avatarUrl: string;
}

const initialState = {
  currentUser: {
    username: "",
    password: "",
    avatarUrl: "",
  },
};

export const counterSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login } = counterSlice.actions;

export default counterSlice.reducer;
