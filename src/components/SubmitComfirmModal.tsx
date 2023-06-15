import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { showSnackbar } from "../redux/slices/app";
import { submitQuestion } from "../apis/room";
import { useState } from "react";
import { increaseQuestionIndex, resetTimer } from "../redux/slices/room";

interface IProps {
  setIsShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  matchPercentage: number;
}

function SubmitComfirmModal({
  setIsShowConfirmModal,
  matchPercentage,
}: IProps) {
  const dispatch = useDispatch();
  const htmlCode = useSelector((state: RootState) => state.room.htmlCode);
  const room = useSelector((state: RootState) => state.room.room);
  const timer = useSelector((state: RootState) => state.room.timer);
  const questionIndex = useSelector(
    (state: RootState) => state.room.questionIndex
  );
  const questionList = useSelector(
    (state: RootState) => state.room.questionList
  );
  const currentQuestion = questionList[questionIndex];

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateHtmlCode = () => {
    if (htmlCode.includes("url") || htmlCode.includes("<img")) {
      return false;
    }
    return true;
  };
  const submit = async () => {
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
    if (timer === 900) {
      return;
    }
    setIsSubmitting(true);
    const access_token = localStorage.getItem("access_token");
    const body = {
      questionId: currentQuestion.id,
      time: 900 - timer,
      htmlCode: htmlCode,
    };
    await submitQuestion(body, room.roomCode, access_token);
    dispatch(increaseQuestionIndex());
    dispatch(resetTimer());
    setIsSubmitting(false);
    setIsShowConfirmModal(false);
  };
  return (
    <div className="w-[100vw] h-[100vh] fixed z-50 bg-overlay flex justify-center items-center drop-shadow-2xl">
      <div className="mb-[200px] relative flex flex-col min-w-[480px] bg-zinc-900 rounded-lg">
        <div className=" bg-zinc-800 px-4 py-2 flex justify-center items-center rounded-tl-lg rounded-tr-lg">
          <p className="text-xl text-center text-slate-300 font-bold tracking-[.25em]">
            SUBMIT QUESTION
          </p>
        </div>
        <div className="w-full px-4 py-4 flex flex-col items-center">
          <p className="text-lg text-slate-300 max-w-[400px] text-center">
            Do you really want to submit this question with{" "}
            <p className="font-bold text-white text-xl">{matchPercentage}%</p>
            &nbsp;compatibility rate?{" "}
          </p>
          <div className="mt-4 flex justify-between gap-2 w-full">
            <button
              onClick={() => setIsShowConfirmModal(false)}
              className="w-1/2 py-2 text-slate-800 bg-red-500 font-medium hover:bg-red-400 transition-all"
            >
              CANCEL
            </button>
            {isSubmitting ? (
              <button className="relative w-1/2 py-2 text-zinc-800 bg-zinc-500">
                <span className="absolute top-2 right-[calc(50%-12px)] loader"></span>
              </button>
            ) : (
              <button
                onClick={submit}
                className="w-1/2 py-2 text-slate-800 bg-primary font-medium hover:bg-blue-400 transition-all"
              >
                SUBMIT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitComfirmModal;
