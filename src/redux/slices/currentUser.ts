import { createSlice } from "@reduxjs/toolkit";

export interface User {
  username: string;
  password: string;
  avatarUrl: string;
  role: string;
}

const initialState = {
  currentUser: {
    username: "",
    password: "",
    avatarUrl: "",
    role: "",
  },
};

export const counterSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logout: () => {
      localStorage.removeItem("currentUser");
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;
