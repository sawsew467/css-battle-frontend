import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function Leaderboard() {
  const leaderdoard = useSelector((state: RootState) => state.room.leaderboard);
  return (
    <>
      <div>
        <div className="w-full bg-zinc-800 text-slate-300 text-lg py-1 flex items-center pl-6 font-bold tracking-[.25em] uppercase">
          Leaderboard
        </div>
        <div className="bg-zinc-900 text-slate-300 p-6 min-h-[calc(100vh-623px)]">
          <ul className="flex flex-col gap-2">
            {leaderdoard.map((roundResult, index) => roundResult[0]?.time !== 0 ? (
              <li>
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
                    <tr className="flex flex-row border-2 border-t-0">
                      <td className="w-1/3 py-1 px-2">{user?.username}</td>
                      <td className="w-1/3 py-1 px-2 border-x-2">
                        {user?.time > 0 ? user?.point : "- - -"}
                      </td>
                      <td className="w-1/3 py-1 px-2">{user?.time > 0 ? `${user?.time}s` : "- - -"}</td>
                    </tr>
                  ))}
                </table>
              </li>
            ) : <></>)}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
