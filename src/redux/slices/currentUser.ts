import { createSlice } from "@reduxjs/toolkit";

export interface User {
  username: string;
  password: string;
  avatarUrl: string;
  role: string;
}

const initialState = {
  currentUser: {
    id: "",
    username: "",
    avatarUrl: "",
    role: "",
    createAt: "",
    updateAp: "",
  },
  participant: {
    role: "",
    roomCode: "",
    status: "DOING",
  },
};

export const counterSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      localStorage.setItem("access_token", action.payload?.access_token);
      localStorage.setItem("refresh_token", action.payload?.refresh_token);
    },
    logout: () => {
      localStorage.removeItem("currentUser");
    },
    joinRoom: (state, action) => {
      state.participant.role = "GUEST";
      state.participant.roomCode = action.payload;
    },
    createRoom: (state, action) => {
      state.participant.role = "HOST";
      state.participant.roomCode = action.payload;
    },
    changePaticipantStatus: (state, action) => {
      state.participant.status = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, createRoom, joinRoom, changePaticipantStatus } = counterSlice.actions;

export default counterSlice.reducer;
