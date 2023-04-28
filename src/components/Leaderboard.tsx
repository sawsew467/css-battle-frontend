function Leaderboard() {
  const leaderboardData = [
    {
      username: "DE170145",
      point: 100,
      time: 143,
    },
    {
      username: "DS678237",
      point: 31,
      time: 298,
    },
    {
      username: "SA879883",
      point: 11,
      time: 434,
    },
  ];
  return (
    <>
      <div>
        <div className="w-full bg-zinc-800 text-slate-300 text-lg py-1 flex items-center pl-6 font-bold tracking-[.25em] uppercase">
          Leaderboard
        </div>
        <div className="bg-zinc-900 text-slate-300 p-6">
          <ul className="flex flex-col gap-2">
            <li>
              <div className="mb-1 underline font-bold text-lg">
                Question 1:
              </div>
              <table className="w-full text-sm">
                <tr className="flex flex-row border-2">
                  <th className="w-1/3 py-1 px-2 text-start">Username</th>
                  <th className="w-1/3 py-1 px-2 text-start border-x-2">
                    Point
                  </th>
                  <th className="w-1/3 py-1 px-2 text-start">Time</th>
                </tr>
                {leaderboardData.map((item) => (
                  <tr className="flex flex-row border-2 border-t-0">
                    <td className="w-1/3 py-1 px-2">{item.username}</td>
                    <td className="w-1/3 py-1 px-2 border-x-2">{item.point}</td>
                    <td className="w-1/3 py-1 px-2">{item.time}s</td>
                  </tr>
                ))}
              </table>
            </li>
            <li>
              <div className="mb-1 underline font-bold text-lg">
                Question 1:
              </div>
              <table className="w-full text-sm">
                <tr className="flex flex-row border-2">
                  <th className="w-1/3 py-1 px-2 text-start">Username</th>
                  <th className="w-1/3 py-1 px-2 text-start border-x-2">
                    Point
                  </th>
                  <th className="w-1/3 py-1 px-2 text-start">Time</th>
                </tr>
                {leaderboardData.map((item) => (
                  <tr className="flex flex-row border-2 border-t-0">
                    <td className="w-1/3 py-1 px-2">{item.username}</td>
                    <td className="w-1/3 py-1 px-2 border-x-2">{item.point}</td>
                    <td className="w-1/3 py-1 px-2">{item.time}s</td>
                  </tr>
                ))}
              </table>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
