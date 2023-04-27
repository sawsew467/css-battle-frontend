interface IProps {
  acountList: {
    username: string;
    password: string;
    avatarUrl: string;
  }[];
}

function AccountTable({ acountList }: IProps) {
  return (
    <>
      <div className="w-1/2 h-full border-l-[1px] border-zinc-600">
        <div className="w-full bg-zinc-800 text-slate-300 text-lg h-9 flex items-center gap-8 pl-4 font-bold tracking-[.25em]">
          <div className="w-1/12 text-end"></div>
          <div className="w-1/12 text-end"></div>
          <div className="w-1/4">USERNAME</div>
          <div className="w-1/4">PASSWORD</div>
        </div>
        <ul className="w-full flex flex-col h-[calc(100vh-140px)] overflow-auto">
          {acountList.map((account, index) => (
            <li className="w-full text-slate-300 text-md flex items-center gap-8 pl-4 py-2 font-bold border-b-2 border-zinc-800">
              <div className="w-1/12 text-end">{index + 1}</div>
              <div className="w-1/12 flex justify-center">
                <img
                  src={account.avatarUrl}
                  className="w-9 h-9 rounded-full"
                ></img>
              </div>
              <div className="w-1/4">{account.username}</div>
              <div className="w-1/4">{account.password}</div>
              <div className="flex-1 flex justify-center text-zinc-700 hover:text-red-500 transition-all cursor-pointer">
                <i className="fa-solid fa-trash "></i>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AccountTable;
