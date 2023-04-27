import { faker } from "@faker-js/faker";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";

interface IProps {
  setIsShowLounge: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IState {
  Player: {
    username: string;
    avatarUrl: string;
    status: boolean;
  } | null;
  Players: IState["Player"][];
}

function Lounge({ setIsShowLounge }: IProps) {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.currentUser
  );

  const [isPlayable, setIsPlayable] = useState<boolean>(false);
  const [players, setPlayers] = useState<IState["Players"]>([
    {
      username: currentUser.username,
      avatarUrl: currentUser.avatarUrl,
      status: true,
    },
    {
      username: "DS170283",
      avatarUrl: faker.image.avatar(),
      status: false,
    },
    {
      username: "de134241",
      avatarUrl: faker.image.avatar(),
      status: true,
    },
    null,
    null,
  ]);

  const handleChangePlayerStatus = (pos: number) => {
    setPlayers(
      players.map((player, index) => {
        if (index === pos && player) {
          return {
            username: player.username,
            avatarUrl: player.avatarUrl,
            status: true,
          };
        } else {
          return player;
        }
      })
    );
  };

  const handleStartGame = () => {
    setIsShowLounge(false);
  };

  useEffect(() => {
    !players.some((player) => player?.status === false) && setIsPlayable(true);
  }, [players]);

  return (
    <>
      <div className="w-[100vw] h-[100vh] fixed z-50 bg-overlay flex justify-center items-center  drop-shadow-2xl">
        <div className="flex flex-col min-w-[480px] bg-zinc-900 rounded-lg">
          <div className=" bg-zinc-800 px-4 py-2 flex justify-between items-center rounded-tl-lg rounded-tr-lg">
            <p className="text-xl text-slate-300 font-bold tracking-[.25em] text-center w-full">
              WAITING ROOM
            </p>
          </div>
          <div className="w-full px-4 py-8 flex flex-col">
            <ul className="w-full flex flex-row">
              {players.map((player, index) => {
                if (player) {
                  return (
                    <li
                      className="flex flex-col items-center gap-2 w-1/5"
                      onClick={() => handleChangePlayerStatus(index)}
                    >
                      <img
                        className="w-12 h-12 rounded-md"
                        src={player.avatarUrl}
                      ></img>
                      {player.status ? (
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
            </ul>
            {isPlayable ? (
              <button
                onClick={handleStartGame}
                className="text-md text-slate-800 py-2 bg-primary w-4/5 mx-auto mt-4 rounded-md border-2 border-zinc-600 hover:bg-yellow-300 transition-all"
              >
                START
              </button>
            ) : (
              <button className="text-md text-slate-800 py-2 bg-zinc-500 w-4/5 mx-auto mt-4 rounded-md border-2 border-zinc-600 cursor-not-allowed transition-all">
                START
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Lounge;
