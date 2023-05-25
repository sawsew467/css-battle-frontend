import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function Summary() {
  const leaderdoard = useSelector((state: RootState) => state.room.leaderboard);
  const summary = useSelector((state: RootState) => state.room.summary);
  console.log("summary");
  console.log(summary);

  return (
    <>
      <div className="w-[100vw] h-[100vh] fixed z-50 bg-overlay flex justify-center items-center drop-shadow-2xl">
        <div className="relative flex flex-col min-w-[480px] bg-zinc-900 rounded-lg">
          <div className="relative bg-zinc-800 px-4 py-2 flex justify-between items-center rounded-tl-lg rounded-tr-lg">
            <p className="text-xl text-slate-300 font-bold text-center w-full">
              FINNISH GAME
            </p>
          </div>
          <div className="w-full px-4 py-4 flex flex-col max-h-[600px] overflow-y-auto">
            <ul className="flex flex-col gap-2">
              {leaderdoard?.map((roundResult, index) =>
                roundResult[0]?.time !== 0 ? (
                  <li>
                    <div className="mb-1 underline font-bold text-lg text-slate-300">
                      Question {index + 1}:
                    </div>
                    <table className="w-full text-sm text-slate-300">
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
              <li>
                <div className="mb-1 mt-2 underline font-bold text-lg text-slate-300 border-t-2 pt-2 border-dashed">
                  Summary:
                </div>
                <table className="w-full text-sm text-slate-300">
                  <tr className="flex flex-row border-2">
                    <th className="w-1/3 py-1 px-2 text-start">Username</th>
                    <th className="w-1/3 py-1 px-2 text-start border-x-2">
                      Point
                    </th>
                    <th className="w-1/3 py-1 px-2 text-start">Time</th>
                  </tr>
                  {summary?.map((user) => (
                    <tr className="flex flex-row border-2 border-t-0">
                      <td className="w-1/3 py-1 px-2">{user?.username}</td>
                      <td className="w-1/3 py-1 px-2 border-x-2">
                        {user?.totalTime > 0 ? user?.totalPoints : "- - -"}
                      </td>
                      <td className="w-1/3 py-1 px-2">
                        {user?.totalTime > 0 ? `${user?.totalTime}s` : "- - -"}
                      </td>
                    </tr>
                  ))}
                </table>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Summary;