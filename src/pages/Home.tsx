import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import LoginModal from "../components/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import RegisterModal from "../components/RegisterModal";
import { createNewRoom, joinInRoom } from "../apis/room";
import { ably } from "../App";
import { RoomIState, resetRoom, update } from "../redux/slices/room";
import { createRoom, joinRoom } from "../redux/slices/currentUser";
import { changeLoadingStatus, showSnackbar } from "../redux/slices/app";
import LoadingModal from "../components/LoadingModal";

function Home() {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.currentUser
  );
  const pageLoading = useSelector(
    (state: RootState) => state.app.pageLoading.status
  );

  const [roomCode, setRoomCode] = useState<string>("");
  const [isShowLoginModal, setIsShowLoginModal] = useState<boolean>(false);
  const [isShowRegisterModal, setIsShowRegisterModal] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEnterRoomCode = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!currentUser.username) {
      setIsShowLoginModal(true);
      return;
    }

    if (e.code === "Enter") {
      dispatch(changeLoadingStatus(true));
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        const response = await joinInRoom(roomCode, access_token);
        const room: RoomIState["room"] = response.data.data.data.room;
        dispatch(update(room));
        dispatch(joinRoom(room.roomCode));
        ably.channels.get(roomCode);
        dispatch(changeLoadingStatus(true));
        navigate(`/play/${roomCode}`);
        dispatch(
          showSnackbar({
            open: true,
            message: "Join room successfully",
            type: "success",
          })
        );
      }
    }
  };
  const craeteNewRoom = async () => {
    if (!currentUser.username) {
      setIsShowLoginModal(true);
      return;
    }
    dispatch(resetRoom());
    dispatch(changeLoadingStatus(true));
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const response = await createNewRoom(access_token);
      const room: RoomIState["room"] = response.data.data.data.room;      
      dispatch(update(room));
      dispatch(createRoom(room.roomCode));
      const roomCode = response.data.data.data.room.roomCode;
      ably.channels.get(roomCode);
      dispatch(changeLoadingStatus(false));
      navigate(`/play/${roomCode}`);
      dispatch(
        showSnackbar({
          open: true,
          message: "Create room successfully",
          type: "success",
        })
      );
      
    }
  };
  
  return (
    <>
      {isShowLoginModal && (
        <LoginModal
          setIsShowLoginModal={setIsShowLoginModal}
          setIsShowRegisterModal={setIsShowRegisterModal}
        ></LoginModal>
      )}
      {isShowRegisterModal && (
        <RegisterModal
          setIsShowRegisterModal={setIsShowRegisterModal}
          setIsShowLoginModal={setIsShowLoginModal}
        ></RegisterModal>
      )}
      {pageLoading && <LoadingModal></LoadingModal>}
      

      <div className="flex flex-col h-[100vh] justify-between">
        <Header
          setIsShowLoginModal={setIsShowLoginModal}
          setIsShowRegisterModal={setIsShowRegisterModal}
        ></Header>
        <div className="flex-1 flex flex-row bg-zinc-900 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-primary text-6xl font-bold tracking-[.2em]">
              CSS BATTLE{" "}
            </h1>
            <div className="w-full flex justify-center items-center">
              <div className="w-1/6 h-1 bg-primary"></div>
              <p className="text-primary text-xl p-2 bg-zinc-900">
                FINDING THE KING OF CSS
              </p>
              <div className="w-1/6 h-1 bg-primary"></div>
            </div>
            <div className="flex flex-col items-center">
              <input
                className="outline-none bg-black border-2 border-zinc-600 text-slate-300 px-4 py-2 rounded-md text-lg text-center"
                type="text"
                placeholder="ROOM CODE"
                onChange={(e) => setRoomCode(e.target.value)}
                onKeyDown={(e) => handleEnterRoomCode(e)}
              ></input>
              <span className="text-zinc-500 text-sm my-2">OR</span>
              <button
                className="text-lg text-slate-800 py-2 bg-primary w-full rounded-md border-2 border-zinc-600 hover:bg-blue-400 transition-all"
                onClick={craeteNewRoom}
              >
                CREATE ROOM
              </button>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Home;
