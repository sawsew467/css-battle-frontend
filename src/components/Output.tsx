import { useState } from "react";
import Compare from "../assets/images/output/compare.svg";

interface IProps {
  code: string;
}

function Output({ code }: IProps) {
  const [isShow, setIsShow] = useState<boolean>(false);
  console.log(isShow);

  return (
    <div className="h-full flex flex-col border-l-[1px] border-zinc-600">
      <div className="w-full bg-zinc-800 text-slate-300 text-lg h-9 flex items-center pl-4 font-bold tracking-[.25em]">
        OUTPUT
      </div>
      <div className="flex-1 bg-zinc-900 flex flex-col items-end">
        <div className="w-[400px] h-[300px] bg-slate-200 m-6 relative cursor-col-resize group">
          {isShow && (
            <img
              className="absolute z-30 top-0 left-0"
              src="https://cssbattle.dev/targets/1@2x.png"
            ></img>
          )}
          <div
            className="absolute z-20 w-[400px] h-[300px] bg-white top-0 left-0"
            id="output"
          >
            <iframe
              srcDoc={code}
              title="output"
              sandbox="allow-scripts"
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <button
          className="bg-zinc-800 w-[100px] mr-6 flex justify-center py-2 hover:bg-zinc-700 transition-all"
          onMouseDown={() => setIsShow(true)}
          onMouseUp={() => setIsShow(false)}
        >
          <img className="h-[32px]" src={Compare}></img>
        </button>
      </div>
    </div>
  );
}

export default Output;
