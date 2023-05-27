import { configureStore } from "@reduxjs/toolkit";
import currentUser from "./slices/currentUser";
import room from "./slices/room";
import app from "./slices/app";

export const store = configureStore({
  reducer: {
    currentUser: currentUser,
    room: room,
    app: app
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
