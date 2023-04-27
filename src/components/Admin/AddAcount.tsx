interface IProps {
  setAccountList: React.Dispatch<
    React.SetStateAction<
      {
        username: string;
        password: string;
        avatarUrl: string;
      }[]
    >
  >;
}

function AddAcount({ setAccountList }: IProps) {
  const handleAddAccount = () => {
    setAccountList([]);
  };
  return (
    <>
      <div className="flex justify-center flex-1">
        <div className="w-[400px]">
          <p className="ml-4 text-xl text-slate-300 font-bold tracking-[.25em]">
            ADD NEW ACCOUNT
          </p>
          <div className="flex flex-col items-start gap-4 px-4 py-4 rounded-br-lg rounded-bl-lg">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-md text-slate-300 font-bold tracking-[.25em]">
                Username
              </p>
              <input
                //   onChange={(e) =>
                //     setInput({ ...input, username: e.target.value })
                //   }
                type="text"
                className="outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-lg"
              ></input>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <p className="text-md text-slate-300 font-bold tracking-[.25em]">
                Password
              </p>
              <input
                //   onChange={(e) =>
                //     setInput({ ...input, password: e.target.value })
                //   }
                //   onKeyDown={(e) => handleEnterPress(e)}
                type="password"
                className="outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-lg"
              ></input>
            </div>
            <button
              onClick={handleAddAccount}
              className="w-full text-slate-300 bg-zinc-700 border-none py-2 rounded-md hover:bg-zinc-600 transition-all"
            >
              ADD ACCOUNT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAcount;
