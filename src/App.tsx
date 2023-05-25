import { Route, Routes } from "react-router";
import Play from "./pages/Play";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Admin from "./pages/Admin";
import { useEffect, useState } from "react";
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

// eslint-disable-next-line react-refresh/only-export-components
export const ably = new Ably.Realtime(
  "CcFGtw.enLESQ:o0J-WXGZBDkSjBV6rC66mtk8TlKXw0Is4kQ2WoDSkoM"
);

function App() {
  const dispatch = useDispatch();

  const [roomCodeApp, setRoomCodeApp] = useState("");

  ably.connection.on("connected", () => {
    console.log("Connected to Ably!");
  });
  const channel = ably.channels.get(roomCodeApp);
  channel.subscribe("roomUpdated", (message) => {
    const room: RoomIState["room"] = message.data.room;
    dispatch(update(room));
  });
  channel.subscribe("gameStarted", (message) => {
    const room: RoomIState["room"] = message.data.room;
    room.participants.some((participant) => participant?.status === "WAITING")
      ? dispatch(changeStatus("OPEN"))
      : dispatch(changeStatus("INPROGRESS"));
    const questionList = message.data.room.questions;
    dispatch(updateQuestionList(questionList));
  });
  channel.subscribe("progressUpdated", (message) => {
    const leaderboardUpdated = message.data.leaderboard;
    console.log(message);
    
    dispatch(updateLeaderboard(leaderboardUpdated));
  });
  channel.subscribe("playerFinished", (message) => {
    const summary = message.data.summary;
    console.log("!!!");
    console.log(summary);
    
    dispatch(updateSummary(summary));
  });
  // channel.subscribe("gameFinished", (message) => {
  //   const summary = message;
  //   console.log("!!!");
  //   console.log(summary);
    
  //   dispatch(updateSummary(summary));
  // });
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.currentUser
  );

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      dispatch(login(JSON.parse(`${localStorage.getItem("currentUser")}`)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home setRoomCodeApp={setRoomCodeApp}></Home>}
        ></Route>
        <Route
          path="/home"
          element={<Home setRoomCodeApp={setRoomCodeApp}></Home>}
        ></Route>
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
        <Route
          path="*"
          element={<Home setRoomCodeApp={setRoomCodeApp}></Home>}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
