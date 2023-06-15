interface IProps {
  options: {
    numOfEasy: number;
    numOfMedium: number;
    numOfHard: number;
  };
  setOptions: React.Dispatch<React.SetStateAction<IProps["options"]>>;
  setCollectionCode: React.Dispatch<React.SetStateAction<string>>
}

function Settings({ options, setOptions, setCollectionCode }: IProps) {
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
              value={options.numOfEasy}
              onChange={(e) =>
                setOptions({ ...options, numOfEasy: +e.target.value })
              }
              type="text"
              className="w-[full] outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-md"
            ></input>
          </div>
          <div className="flex flex-col w-[100px]">
            <p className="text-slate-300 mb-1">Medium</p>
            <input
              value={options.numOfMedium}
              onChange={(e) =>
                setOptions({ ...options, numOfMedium: +e.target.value })
              }
              type="text"
              className="w-[full] outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-md"
            ></input>
          </div>
          <div className="flex flex-col w-[100px]">
            <p className="text-slate-300 mb-1">Hard</p>
            <input
              value={options.numOfHard}
              onChange={(e) =>
                setOptions({ ...options, numOfHard: +e.target.value })
              }
              type="text"
              className="w-[full] outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-md"
            ></input>
          </div>
        </div>
        <p className="text-md text-slate-300 font-bold tracking-[.25em] mt-4">
          Collection
        </p>
        <div className="flex flex-col w-[100px]">
            <p className="text-slate-300 mb-1">Code</p>
            <input
              onChange={(e) =>
                setCollectionCode(e.target.value)
              }
              type="text"
              className="w-[full] outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-md"
            ></input>
          </div>
      </div>
    </div>
  );
}

export default Settings;
