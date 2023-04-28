import { useState } from "react";

function Settings() {
  const [options, setOptions] = useState({
    easyNumber: 2,
    mediumNumber: 2,
    hardNumber: 1,
  });
  console.log(setOptions);
  
  return (
    <div className="absolute left-full min-h-[200px] ml-4 bg-zinc-900 rounded-md drop-shadow-2xl">
      <div className="relative bg-zinc-800 px-4 py-2 flex justify-between items-center rounded-tl-lg rounded-tr-lg">
        <p className="text-xl text-slate-300 font-bold tracking-[.25em] text-center w-full">
          SETTINGS
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full p-6">
        <p className="text-md text-slate-300 font-bold tracking-[.25em]">
          Difficulty
        </p>
        <div className="flex flex-row gap-2 w-full">
          <div className="flex flex-col w-[100px]">
            <p className="text-slate-300 mb-1">Easy</p>
            <input
              value={options.easyNumber}
              //   onChange={(e) => handleChangeColor(e, index)}
              type="text"
              className="w-[full] outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-md"
            ></input>
          </div>
          <div className="flex flex-col w-[100px]">
            <p className="text-slate-300 mb-1">Medium</p>
            <input
              value={options.mediumNumber}
              //   onChange={(e) => handleChangeColor(e, index)}
              type="text"
              className="w-[full] outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-md"
            ></input>
          </div>
          <div className="flex flex-col w-[100px]">
            <p className="text-slate-300 mb-1">Hard</p>
            <input
              value={options.hardNumber}
              //   onChange={(e) => handleChangeColor(e, index)}
              type="text"
              className="w-[full] outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-md"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
