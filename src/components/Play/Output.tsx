import { useEffect, useRef, useState } from "react";
import Compare from "../../assets/images/output/compare.svg";
import Loader from "../../assets/images/output/loader.svg";
import { Img } from "react-image";

interface IProps {
  code: string;
}

function Output({ code }: IProps) {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [matchPercentage, setMatchPercentage] = useState<number>(0);

  useEffect(() => {
    if (!isCheck) {
      return;
    }
    setIsLoading(true);
    setTimeout(()=> {
      setIsLoading(false);
      setMatchPercentage(Math.floor(Math.random() * 100));
    setIsCheck(false);
    },1000)
  }, [isCheck]);
  console.log(isCheck);

  return (
    <div className="h-full flex flex-col border-l-[1px] border-zinc-600">
      <div className="w-full bg-zinc-800 text-slate-300 text-lg h-9 flex items-center pl-4 font-bold tracking-[.25em]">
        OUTPUT
      </div>
      <div className="flex-1 bg-zinc-900 flex flex-col items-end">
        <div className="w-[400px] h-[300px] bg-slate-200 m-6 relative cursor-col-resize group">
          <Img
            className="absolute z-30 top-0 left-0 invisible"
            src="https://cssbattle.dev/targets/1@2x.png"
          ></Img>
          <Img
            className="absolute z-30 top-0 left-0 invisible"
            src="https://cssbattle.dev/targets/1@2x.png"
          ></Img>
          {isShow && (
            <Img
              className="absolute z-30 top-0 left-0"
              src="https://cssbattle.dev/targets/1@2x.png"
            ></Img>
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
          <button
            className="absolute z-40 bottom-1 left-1 opacity-50 hover:opacity-100 bg-zinc-800 w-[50px] mr-6 flex justify-center py-1 px-2 hover:bg-zinc-700 transition-all"
            onMouseDown={() => setIsShow(true)}
            onMouseUp={() => setIsShow(false)}
          >
            <img className="h-[20px]" src={Compare}></img>
          </button>
        </div>
        <div className="flex w-full pl-6">
          <p className="text-slate-300">
            Compatibility rate: <span>{matchPercentage}</span>%
          </p>
        </div>
        <div className="px-6 mt-2 flex justify-between gap-2 w-full">
          <button
            className="relative w-1/2 py-2 text-primary border-2 border-primary font-medium hover:bg-zinc-800 transition-all"
            onClick={() => setIsCheck(true)}
          >
            Check
            {isLoading && (
              <div className="absolute top-[10px] right-6">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
          </button>
          <button className="w-1/2 py-2 text-slate-800 bg-primary font-medium opacity-20 cursor-not-allowed">
            Finnish
          </button>
        </div>
      </div>
    </div>
  );
}

export default Output;
