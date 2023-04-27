import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import Login from "../components/Login";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function Home() {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.currentUser
  );

  const [roomCode, setRoomCode] = useState<string>("");
  const [isShowLoginModal, setIsShowLoginModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleEnterRoomCode = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!currentUser.username) {
      setIsShowLoginModal(true);
      return;
    }
    if (e.code === "Enter") {
      navigate(`/play/${roomCode}`);
    }
  };
  const craeteNewRoom = () => {
    if (!currentUser.username) {
      setIsShowLoginModal(true);
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000);
    navigate(`/play/${code}`);
  };
  return (
    <>
      {isShowLoginModal && (
        <Login setIsShowLoginModal={setIsShowLoginModal}></Login>
      )}
      <div className="flex flex-col h-[100vh] justify-between">
        <Header setIsShowLoginModal={setIsShowLoginModal}></Header>
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
                className="text-lg text-slate-800 py-2 bg-primary w-full rounded-md border-2 border-zinc-600 hover:bg-yellow-300 transition-all"
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
