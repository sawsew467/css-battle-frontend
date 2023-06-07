import React from "react";
import { Route, Routes } from "react-router";
import Play from "./pages/Play";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Admin from "./pages/Admin";
import { useEffect } from "react";
import { login } from "./redux/slices/currentUser";
import Account from "./pages/Account";
import Question from "./pages/Question";
import Ably from "ably/promises";
import {
  RoomIState,
  update,
  changeStatus,
  updateQuestionList,
  updateLeaderboard,
  updateSummary,
} from "./redux/slices/room";
import { Snackbar } from "@mui/material";
import { hideSnackbar, showSnackbar } from "./redux/slices/app";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import NotFound from "./pages/NotFound";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// eslint-disable-next-line react-refresh/only-export-components
export const ably = new Ably.Realtime(
  "CcFGtw.enLESQ:o0J-WXGZBDkSjBV6rC66mtk8TlKXw0Is4kQ2WoDSkoM"
);

function App() {
  const roomCode = useSelector((state: RootState) => state.room.room.roomCode);
  const dispatch = useDispatch();

  ably.connection.on("connected", () => {
    console.log("Connected to Ably!");
  });

  if (roomCode !== "") {
    const channel = ably.channels.get(roomCode);

    channel.subscribe("roomUpdated", (message) => {
      const room: RoomIState["room"] = message.data.room;
      dispatch(update(room));
    });

    channel.subscribe("gameStarted", (message) => {
      const room: RoomIState["room"] = message.data.room;
      room.players.some((player) => player?.status === "WAITING")
        ? dispatch(changeStatus("OPEN"))
        : dispatch(changeStatus("INPROGRESS"));
      const questionList = message.data.room.questions;
      dispatch(updateQuestionList(questionList));
    });
    channel.subscribe("progressUpdated", (message) => {
      const leaderboardUpdated = message.data.leaderboard;
      dispatch(updateLeaderboard(leaderboardUpdated));
      dispatch(
        showSnackbar({
          open: true,
          message: message.data.message,
          type: "info",
        })
      );
    });
    channel.subscribe("playerFinished", (message) => {
      const summary = message.data.summary;
      dispatch(updateSummary(summary));
      const leaderboardUpdated = message.data.leaderboard;
      dispatch(updateLeaderboard(leaderboardUpdated));
    });
  }

  const currentUser = useSelector(
    (state: RootState) => state.currentUser.currentUser
  );

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      dispatch(login(JSON.parse(`${localStorage.getItem("currentUser")}`)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const snackBar = useSelector((state: RootState) => state.app.snackBar);
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideSnackbar());
  };

  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    return (ev.returnValue = "Are you sure you want to close?");
  });
  return (
    <>
      {snackBar.open && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBar.open}
          onClose={handleClose}
          autoHideDuration={2000}
        >
          <Alert onClose={handleClose} severity={snackBar.type}>
            {snackBar.message}
          </Alert>
        </Snackbar>
      )}
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        {currentUser.avatarUrl && (
          <Route path="/play/:id" element={<Play></Play>}></Route>
        )}
        {currentUser.role === "ADMIN" && (
          <>
            <Route path="/admin" element={<Admin></Admin>}></Route>
            <Route path="/account" element={<Account></Account>}></Route>
            <Route path="/question" element={<Question></Question>}></Route>
          </>
        )}
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </>
  );
}

export default App;
