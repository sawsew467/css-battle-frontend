import { useEffect, useState } from "react";

interface IProps {
  setIsShowCoundown: React.Dispatch<React.SetStateAction<boolean>>;
}

function CountdownModal({ setIsShowCoundown }: IProps) {
  const [counter, setCounter] = useState<number>(3);

  useEffect(() => {
    const countdown = setInterval(() => {
      setCounter((time) => time - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, []);
  useEffect(() => {
    !counter && setIsShowCoundown(false);
  }, [counter, setIsShowCoundown]);

  return (
    <>
      <div className="w-[100vw] h-[100vh] fixed z-50 bg-overlay flex justify-center items-center  drop-shadow-2xl ">
        <div className="flex flex-col items-center bg-zinc-900 rounded-lg p-6 drop-shadow-lg">
          <div className="text-primary text-4xl w-[100px] h-[100px] flex items-center justify-center border-4 border-primary rounded-full">
            {counter}
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="w-1/6 h-1 bg-primary"></div>
            <p className="text-primary text-xl p-2 bg-zinc-900 text-center">
              Stay focused and keep going, you got this!
            </p>
            <div className="w-1/6 h-1 bg-primary"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountdownModal;
