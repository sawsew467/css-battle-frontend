import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getResultBoard } from "../apis/room";
import { updateLeaderboard } from "../redux/slices/room";
import { showSnackbar } from "../redux/slices/app";

function Leaderboard() {
  const leaderdoard = useSelector((state: RootState) => state.room.leaderboard);
  const roomCode = useSelector((state: RootState) => state.room.room.roomCode);

  const dispatch = useDispatch();
  const reloadData = async () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const res = await getResultBoard(roomCode, access_token);
      console.log(res);
      console.log(leaderdoard);
      dispatch(updateLeaderboard(res.data.data.leaderboard));
      dispatch(
        showSnackbar({
          open: true,
          message: "Leaderboard updated",
          type: "success",
        })
      );
    }
  };
  return (
    <>
      <div>
        <div className="w-full bg-zinc-800 text-slate-300 text-lg py-1 flex items-center justify-between px-6 font-bold tracking-[.25em] uppercase">
          <p>Leaderboard</p>
          <button onClick={reloadData}>
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </div>
        <div className="bg-zinc-900 text-slate-300 p-6 min-h-[calc(100vh-624px)]">
          <ul className="flex flex-col gap-2">
            {leaderdoard.map((roundResult, index) =>
              roundResult[0]?.time !== 0 ? (
                <li key={index}>
                  <div className="mb-1 underline font-bold text-lg">
                    Question {index + 1}:
                  </div>
                  <table className="w-full text-sm">
                    <tr className="flex flex-row border-2">
                      <th className="w-1/3 py-1 px-2 text-start">Username</th>
                      <th className="w-1/3 py-1 px-2 text-start border-x-2">
                        Point
                      </th>
                      <th className="w-1/3 py-1 px-2 text-start">Time</th>
                    </tr>
                    {roundResult.map((user) => (
                      <tr
                        key={user.username}
                        className="flex flex-row border-2 border-t-0"
                      >
                        <td className="w-1/3 py-1 px-2">{user?.username}</td>
                        <td className="w-1/3 py-1 px-2 border-x-2">
                          {user?.time > 0 ? user?.point : "- - -"}
                        </td>
                        <td className="w-1/3 py-1 px-2">
                          {user?.time > 0 ? `${user?.time}s` : "- - -"}
                        </td>
                      </tr>
                    ))}
                  </table>
                </li>
              ) : (
                <></>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
