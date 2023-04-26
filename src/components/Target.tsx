function Target() {
  return (
    <div className="h-full flex flex-col border-l-[1px] border-zinc-600">
      <div className="w-full bg-zinc-800 text-slate-300 text-lg h-9 flex items-center justify-between px-4 ">
        <p className="font-bold tracking-[.25em]">TARGET</p>
        <p className="text-sm text-zinc-500">400px x 300px</p>
      </div>
      <div className="flex-1 bg-zinc-900">
        <div className="w-[400px] h-[300px] bg-slate-200 m-6">
          <img src="https://cssbattle.dev/targets/2@2x.png"></img>
        </div>
        <div className="flex flex-col gap-3 px-6">
          <p className="text-slate-300 font-semibold">COLORS IN DESIGN</p>
          <div className="bg-black p-4 rounded-md">
            <ul className="w-full h-full flex flex-row flex-wrap gap-y-4">
              <li className="w-1/2 flex items-center gap-2 cursor-pointer">
                <div className="w-6 h-6 rounded-full border-2 border-zinc-200 bg-[#6592CF]"></div>
                <p className="text-slate-300 uppercase">#6592CF</p>
              </li>
              <li className="w-1/2 flex items-center gap-2 cursor-pointer">
                <div className="w-6 h-6 rounded-full border-2 border-zinc-200 bg-[#243D83]"></div>
                <p className="text-slate-300 uppercase">#243D83</p>
              </li>
              <li className="w-1/2 flex items-center gap-2 cursor-pointer">
                <div className="w-6 h-6 rounded-full border-2 border-zinc-200 bg-[#fdc57b]"></div>
                <p className="text-slate-300 uppercase">#fdc57b</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Target;
