import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import QuestionImg from "../../assets/images/output/questionMark.png";
import { showSnackbar } from "../../redux/slices/app";

function Target() {
  const questionIndex = useSelector(
    (state: RootState) => state.room.questionIndex
  );
  const questionList = useSelector(
    (state: RootState) => state.room.questionList
  );

  const currentQuestion = questionList[questionIndex];
  const getQuestionColor = () => {
    switch (questionList[questionIndex]?.difficulty) {
      case "easy":
        return "#22c55e";
      case "medium":
        return "#eab308";
      case "hard":
        return "#ef4444";
      default:
        return "#22c55e";
    }
  };
  const dispatch = useDispatch();
  const handleColorCopy = (color:string)=> {
    navigator.clipboard.writeText(`#${color}`);
    dispatch(
      showSnackbar({
        open: true,
        message: `Color #${color} has been copied to your clipboard`,
        type: "success",
      })
    );
  }
  return (
    <div className="h-full w-[448px] flex flex-col border-l-[1px] border-zinc-600">
      <div className="w-full bg-zinc-800 text-slate-300 text-lg py-1 flex items-center justify-between px-6">
        <p className="font-bold tracking-[.25em]">
          QUESTION {questionIndex + 1}
        </p>
        <div
          style={{
            color: getQuestionColor(),
          }}
          className="text-green-500 font-bold"
        >
          {questionList[questionIndex]?.difficulty ?? "EASY"}
        </div>
      </div>
      <div className="flex-1 bg-zinc-900">
        <div className="w-[400px] h-[300px] bg-slate-200 m-6">
          <img src={currentQuestion?.imageUrl ?? QuestionImg}></img>
          <p className="text-sm text-zinc-500 text-end mt-1">400px x 300px</p>
        </div>
        <div className="flex flex-col gap-3 px-6">
          <p className="text-slate-300 font-semibold">COLORS IN DESIGN</p>
          <div className="bg-black p-4 rounded-md">
            <ul className="w-full h-full flex flex-row flex-wrap gap-y-4">
              {currentQuestion?.colors?.map((color, index) => (
                <li
                  key={index}
                  className="w-1/2 flex items-center gap-2 cursor-pointer"
                  onClick={() => handleColorCopy(color)}
                >
                  <div
                    style={{
                      backgroundColor: `#${color}`,
                    }}
                    className="w-6 h-6 rounded-full border-2 border-zinc-200"
                  ></div>
                  <p className="text-slate-300 uppercase">#{color}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Target;
