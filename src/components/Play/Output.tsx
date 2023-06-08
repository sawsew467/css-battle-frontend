import { useEffect, useRef, useState } from "react";
import { Img } from "react-image";
import Leaderboard from "../Leaderboard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { decreaseTimer } from "../../redux/slices/room";
import { compareResult } from "../../apis/room";
import { showSnackbar } from "../../redux/slices/app";
import SubmitComfirmModal from "../SubmitComfirmModal";

interface IProps {
  codeEditor: string;
}

function Output({ codeEditor }: IProps) {
  const htmlCode = useSelector((state: RootState) => state.room.htmlCode);

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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false);
  const [matchPercentage, setMatchPercentage] = useState<number>(0);
  const [isDiff, setIsDiff] = useState<boolean>(false);

  const validateHtmlCode = () => {
    if (htmlCode.includes("url") || htmlCode.includes("<img")) {
      return false;
    }
    return true;
  };

  const handleCheck = async () => {
    if (!validateHtmlCode()) {
      dispatch(
        showSnackbar({
          open: true,
          message: "Image is not allowed!!!",
          type: "error",
        })
      );
      return;
    }
    try {
      setIsLoading(true);
      const access_token = localStorage.getItem("access_token");
      const body = {
        questionId: currentQuestion.id,
        htmlCode: htmlCode,
        time: 600 - timer,
      };
      const res = await compareResult(body, access_token);
      setMatchPercentage(res.data.data.point);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (timer === 0) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);
  const handleSubmit = async () => {
    if (!validateHtmlCode()) {
      dispatch(
        showSnackbar({
          open: true,
          message: "Image is not allowed!!!",
          type: "error",
        })
      );
      return;
    }
    try {
      setIsSubmitting(true);
      const access_token = localStorage.getItem("access_token");
      const body = {
        questionId: currentQuestion.id,
        htmlCode: htmlCode,
        time: 600 - timer,
      };
      const res = await compareResult(body, access_token);
      setMatchPercentage(res.data.data.point);
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const submitClick = async () => {
    if (!validateHtmlCode()) {
      dispatch(
        showSnackbar({
          open: true,
          message: "Image is not allowed!!!",
          type: "error",
        })
      );
      return;
    }
    try {
      setIsSubmitting(true);
      const access_token = localStorage.getItem("access_token");
      const body = {
        questionId: currentQuestion.id,
        htmlCode: htmlCode,
        time: 600 - timer,
      };
      const res = await compareResult(body, access_token);
      setMatchPercentage(res.data.data.point);
      setIsSubmitting(false);
      setIsShowConfirmModal(true);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };
  const [shiftPressed, setShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey) {
        setShiftPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.shiftKey) {
        setShiftPressed(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const divRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState({
    mouseX: 400,
    mouseY: 300,
  });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [isShowSlider, setIsShowSlider] = useState(true);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseInside(true);
    const { clientX, clientY } = event;
    const { top, left } = divRef.current?.getBoundingClientRect() || {
      top: 0,
      left: 0,
    };

    const mouseX = clientX - left;
    const mouseY = clientY - top;
    setMousePosition({
      mouseX,
      mouseY,
    });
  };

  const handleMouseLeave = () => {
    setIsMouseInside(false);
    setMousePosition({
      mouseX: 400,
      mouseY: 300,
    });
  };

  return (
    <>
      {isShowConfirmModal && (
        <SubmitComfirmModal
          setIsShowConfirmModal={setIsShowConfirmModal}
          matchPercentage={matchPercentage}
        ></SubmitComfirmModal>
      )}
      <div
        id="style-2"
        className="h-[calc(100vh-104px)] w-[448px] overflow-auto flex flex-col border-l-[1px] border-zinc-600"
      >
        <div className="w-full bg-zinc-800 text-slate-300 py-1 flex items-center justify-between gap-8 px-6">
          <p className="tracking-[.25em] font-bold text-lg">OUTPUT</p>
          <div className="flex gap-2">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                onChange={(e) => setIsShowSlider(e.target.checked)}
                checked={isShowSlider}
                className="outline-none"
              ></input>
              <p className="text-lg">Slide & Compare</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                onChange={(e) => setIsDiff(e.target.checked)}
                className="outline-none"
              ></input>
              <p className="text-lg">Diff</p>
            </div>
          </div>
        </div>
        <div className=" bg-zinc-900 flex flex-col pb-6 relative">
          <div
            className="w-[400px] h-[300px] absolute top-6 left-6 z-40 bg-transparent"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={divRef}
            style={{
              cursor: shiftPressed ? "row-resize" : "col-resize",
            }}
          ></div>
          {isShowSlider && (
            <div
              className="absolute bg-red-500 z-30 top-6 left-6"
              style={{
                height: shiftPressed ? "1px" : "300px",
                width: shiftPressed ? "400px" : "1px",
                display: !isMouseInside ? "none" : "block",
                transform: !shiftPressed
                  ? `translate(${mousePosition.mouseX}px,0)`
                  : `translate(0,${mousePosition.mouseY}px)`,
              }}
            ></div>
          )}
          <Img
            className="absolute z-10 top-6 left-6 w-[400px] h-[300px]"
            src={currentQuestion?.imageUrl}
          ></Img>
          <div
            style={{
              width:
                isShowSlider && !shiftPressed && isMouseInside
                  ? `${mousePosition.mouseX}px`
                  : "400px",
              height:
                isShowSlider && shiftPressed && isMouseInside
                  ? `${mousePosition.mouseY}px`
                  : "300px",
              marginBottom:
                isShowSlider && shiftPressed
                  ? `${324 - mousePosition.mouseY}px`
                  : "24px",
            }}
            className="h-[300px] bg-slate-200 m-6 relative cursor-col-resize group overflow-hidden"
          >
            <div
              className="absolute z-20 w-[400px] h-[300px] bg-white top-0 left-0 overflow-hidden"
              id="output"
              style={{
                mixBlendMode: isDiff ? "difference" : "initial",
              }}
            >
              <iframe
                id="myIframe"
                srcDoc={codeEditor}
                title="Preview"
                sandbox="allow-same-origin"
                width="400px"
                height="300px"
                style={{
                  background: "white",
                  width: "400px",
                  height: "300px",
                  border: "0px",
                  outline: "0px",
                }}
              />
            </div>
          </div>
          <div className="flex w-full px-6 justify-between">
            <p className="text-slate-300">
              Compatibility rate: <span>{matchPercentage}</span>%
            </p>
            <p className="text-red-500">{timer}s</p>
          </div>
          <div className="px-6 mt-2 flex justify-between gap-2 w-full">
            {isLoading ? (
              <button className="relative w-1/2 h-11 py-2 flex justify-center items-center text-primary border-2 border-primary font-medium hover:bg-zinc-800 transition-all">
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
                onClick={handleCheck}
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
                onClick={submitClick}
                className="w-1/2 py-2 text-slate-800 bg-primary font-medium hover:bg-blue-400 transition-all"
              >
                SUBMIT
              </button>
            )}
          </div>
        </div>
        <Leaderboard></Leaderboard>
      </div>
    </>
  );
}

export default Output;
