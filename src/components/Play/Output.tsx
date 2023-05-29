import { useEffect, useRef, useState } from "react";
import Compare from "../../assets/images/output/compare.svg";
import { Img } from "react-image";
import Leaderboard from "../Leaderboard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  decreaseTimer,
  increaseQuestionIndex,
  resetTimer,
} from "../../redux/slices/room";
import { submitQuestion } from "../../apis/room";
// import html2canvas from "html2canvas";

interface IProps {
  code: string;
}

function Output({ code }: IProps) {
  const room = useSelector((state: RootState) => state.room.room);
  const questionIndex = useSelector(
    (state: RootState) => state.room.questionIndex
  );
  const questionList = useSelector(
    (state: RootState) => state.room.questionList
  );
  const timer = useSelector((state: RootState) => state.room.timer);
  const isPlaying = useSelector((state: RootState) => state.room.isPlaying);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isPlaying) {
      const countdown = setInterval(() => {
        dispatch(decreaseTimer(timer - 1));
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [dispatch, timer, questionIndex, isPlaying]);

  const currentQuestion = questionList[questionIndex];

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [matchPercentage, setMatchPercentage] = useState<number>(0);

  useEffect(() => {
    if (!isCheck) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMatchPercentage(Math.floor(Math.random() * 100));
      setIsCheck(false);
    }, 1000);
  }, [isCheck]);
  useEffect(() => {
    if (timer === 0) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);
  const handleSubmit = async () => {
    if (timer === 600) {
      return;
    }
    setIsSubmitting(true);
    const access_token = localStorage.getItem("access_token");
    const body = {
      result: {
        questionId: currentQuestion.id,
        point: matchPercentage,
        time: 600 - timer,
      },
      roomCode: room.roomCode,
    };
    await submitQuestion(body, access_token);
    dispatch(increaseQuestionIndex());
    dispatch(resetTimer());
    setIsSubmitting(false);
    // captureScreenshot();
  };

  const canvasRef = useRef<HTMLDivElement>(null);

  // const captureScreenshot = () => {
  //   if (canvasRef.current) {
  //     html2canvas(canvasRef.current).then((canvas) => {
  //       // Tạo một URL dựa trên dữ liệu hình ảnh trong canvas
  //       const imageUrl = canvas.toDataURL("image/png");

  //       // Tạo một đối tượng HTML <a> ẩn
  //       const link = document.createElement("a");
  //       link.href = imageUrl;
  //       link.download = "screenshot.png"; // Đặt tên tệp tải xuống

  //       // Thêm đối tượng <a> vào DOM và kích hoạt sự kiện nhấp chuột tự động
  //       document.body.appendChild(link);
  //       link.click();

  //       // Xóa đối tượng <a> khỏi DOM
  //       document.body.removeChild(link);
  //     });
  //   }
  // };
  return (
    <div
      className="h-[calc(100vh-104px)] overflow-auto flex flex-col border-l-[1px] border-zinc-600"
      ref={canvasRef}
    >
      <div className="w-full bg-zinc-800 text-slate-300 text-lg py-1 flex items-center justify-between gap-8 px-6 font-bold ">
        <p className="tracking-[.25em]">OUTPUT</p>
        <p className="text-red-500">{timer}s</p>
      </div>
      <div className=" bg-zinc-900 flex flex-col items-end pb-6">
        <div className="w-[400px] h-[300px] bg-slate-200 m-6 relative cursor-col-resize group">
          <Img
            style={{
              zIndex: isShow ? 30 : 10,
            }}
            className="absolute top-0 left-0"
            src={currentQuestion?.imageUrl}
          ></Img>
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
          {isLoading ? (
            <button
              className="relative w-1/2 h-11 py-2 flex justify-center items-center text-primary border-2 border-primary font-medium hover:bg-zinc-800 transition-all"
              onClick={() => setIsCheck(true)}
            >
              {" "}
              <div className="">
                <svg
                  className="animate-spin  h-5 w-5 text-white"
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
            </button>
          ) : (
            <button
              className="relative w-1/2 py-2 text-primary border-2 border-primary font-medium hover:bg-zinc-800 transition-all"
              onClick={() => setIsCheck(true)}
            >
              {" "}
              Check
            </button>
          )}
          {isSubmitting ? (
            <button className="relative w-1/2 py-2 text-zinc-800 bg-zinc-500">
              <span className="absolute top-2 right-[calc(50%-12px)] loader"></span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-1/2 py-2 text-slate-800 bg-primary font-medium hover:bg-blue-400 transition-all"
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
      <Leaderboard></Leaderboard>
    </div>
  );
}

export default Output;
