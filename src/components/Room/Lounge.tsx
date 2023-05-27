import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import Settings from "./Settings";
import { RoomIState, update } from "../../redux/slices/room";
import { changeParticipantStatus, startGame } from "../../apis/room";

interface IState {
  Player: {
    username: string;
    avatarUrl: string;
    status: boolean;
  } | null;
  Players: IState["Player"][];
  options: {
    numOfEasy: number;
    numOfMedium: number;
    numOfHard: number;
  };
}

function Lounge() {
  const participant = useSelector(
    (state: RootState) => state.currentUser.participant
  );
  const room = useSelector((state: RootState) => state.room.room);
  const dispatch = useDispatch();

  const [options, setOptions] = useState<IState["options"]>({
    numOfEasy: 2,
    numOfMedium: 2,
    numOfHard: 1,
  });
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isShowSettings, setIsShowSettings] = useState<boolean>(false);
  const [players, setPlayers] = useState<RoomIState["paticipants"]>([]);
  const [emptyLounge, setEmptyLounge] = useState<number[]>();

  useEffect(() => {
    setPlayers(room.participants);
  }, [room]);
  useEffect(() => {
    const arr: number[] = [];
    for (let i = 1; i <= 5 - players.length; i++) {
      arr.push(i);
    }
    setEmptyLounge(arr);
  }, [players]);

  const handleReady = async () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const body = {
        roomCode: participant.roomCode,
        status: "READY",
      };
      const res = await changeParticipantStatus(body, access_token);
      const roomUpdated = res.data.data.data.room;
      dispatch(update(roomUpdated));
    }
    setIsReady(true);
  };
  const handleCancel = async () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const body = {
        roomCode: participant.roomCode,
        status: "WAITING",
      };
      const res = await changeParticipantStatus(body, access_token);
      const roomUpdated = res.data.data.data.room;
      dispatch(update(roomUpdated));
    }
    setIsReady(false);
  };

  const handleStartGame = async () => {
    const access_token = localStorage.getItem("access_token");
    const body = {
      roomCode: room.roomCode,
      options: options,
    };
    await handleReady();
    await startGame(body, access_token);
  };

  const isReadyAllParticipants = () => {
    for (let i = 1; i < players.length; i++) {
      if (players[i]?.status === "WAITING") {
        return false;
      }
    }
    return true;
  };
  console.log(isReadyAllParticipants());

  return (
    <>
      <div className="w-[100vw] h-[100vh] fixed z-50 bg-overlay flex justify-center items-center drop-shadow-2xl">
        <div className="relative flex flex-col min-w-[480px] bg-zinc-900 rounded-lg">
          {isShowSettings && (
            <Settings setOptions={setOptions} options={options}></Settings>
          )}
          <div className="relative bg-zinc-800 px-4 py-2 flex justify-between items-center rounded-tl-lg rounded-tr-lg">
            <p className="text-xl text-slate-300 font-bold text-center w-full">
              {`ROOM CODE: ${room.roomCode}`}
            </p>
            <i
              onClick={() => setIsShowSettings(!isShowSettings)}
              className="absolute right-4 text-zinc-500 hover:text-slate-300 cursor-pointer transition-all fa-solid fa-gear"
            ></i>
          </div>
          <div className="w-full px-4 py-8 flex flex-col">
            <ul className="w-full flex flex-row">
              {players.map((player) => {
                if (player) {
                  return (
                    <li
                      key={player.id}
                      className="flex flex-col items-center gap-2 w-1/5"
                    >
                      <img
                        className="w-12 h-12 rounded-md"
                        src={player.avatarUrl}
                      ></img>
                      {player.status === "READY" ? (
                        <p className="text-green-500">{player.username}</p>
                      ) : (
                        <p className="text-red-500">{player.username}</p>
                      )}
                    </li>
                  );
                } else {
                  return (
                    <div className="flex flex-col items-center gap-2 w-1/5">
                      <img
                        className="w-12 h-12 rounded-md"
                        src="https://media.istockphoto.com/id/1162198273/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-d%E1%BA%A5u-ch%E1%BA%A5m-h%E1%BB%8Fi-thi%E1%BA%BFt-k%E1%BA%BF-minh-h%E1%BB%8Da-vector-ph%E1%BA%B3ng.jpg?s=612x612&w=0&k=20&c=kLu3UwW8UqmExa6IR9ygcQxG5h5JJUIjaqQfIMODkK4="
                      ></img>
                      <p className="text-slate-300">Waiting...</p>
                    </div>
                  );
                }
              })}
              {emptyLounge?.map((value) => (
                <li
                  key={value}
                  className="flex flex-col items-center gap-2 w-1/5"
                >
                  <img
                    className="w-12 h-12 rounded-md"
                    src={
                      "https://img.freepik.com/free-vector/question-mark-sign-brush-stroke-trash-style-typography-vector_53876-140880.jpg"
                    }
                  ></img>
                  <p className="text-slate-300">Waiting...</p>
                </li>
              ))}
            </ul>
            {participant.role === "GUEST" &&
              (!isReady ? (
                <button
                  onClick={handleReady}
                  className="text-md text-slate-800 py-2 bg-primary w-4/5 mx-auto mt-4 rounded-md border-2 border-zinc-600 hover:bg-yellow-300 transition-all"
                >
                  READY
                </button>
              ) : (
                <button
                  onClick={handleCancel}
                  className="text-md text-slate-800 py-2 bg-zinc-500 w-4/5 mx-auto mt-4 rounded-md border-2 border-zinc-600 transition-all"
                >
                  CANCEL
                </button>
              ))}
            {participant.role === "HOST" &&
              (isReadyAllParticipants() === false ? (
                <button
                  className="text-md text-slate-800 py-2 bg-zinc-500 w-4/5 mx-auto mt-4 rounded-md border-2 border-zinc-600 transition-all"
                >
                  Waiting for all ready
                </button>
              ) : !isReady ? (
                <button
                  onClick={handleStartGame}
                  className="text-md text-slate-800 py-2 bg-primary w-4/5 mx-auto mt-4 rounded-md border-2 border-zinc-600 hover:bg-yellow-300 transition-all"
                >
                  START GAME
                </button>
              ) : (
                <button className="relative w-4/5 h-11 mt-4 mx-auto text-zinc-800 font-bold bg-zinc-500 border-none py-2 rounded-md transition-all">
                  <span className="absolute top-2 right-[calc(50%-12px)] loader"></span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Lounge;
