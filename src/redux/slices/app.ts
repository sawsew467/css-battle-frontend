import { createSlice } from "@reduxjs/toolkit";
interface App {
  app: {
    pageLoading: {
      status: boolean;
    },
    snackBar: {
      open: boolean,
      message: string,
      type: "error" |"warning"|"info"|"success",
    },
  }
}

const initialState:App["app"] = {
  pageLoading: {
    status: false,
  },
  snackBar: {
    open: false,
    message: "",
    type: "error",
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeLoadingStatus: (state, action) => {
      state.pageLoading.status = action.payload;
    },
    showSnackbar: (state, action) => {
      state.snackBar = {
        open: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideSnackbar: (state) => {
      state.snackBar.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeLoadingStatus, showSnackbar, hideSnackbar } =
  appSlice.actions;

export default appSlice.reducer;
