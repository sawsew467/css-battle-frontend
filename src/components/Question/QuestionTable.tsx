import { SetStateAction } from "react";
import Tag from "../Tag";

interface IProps {
  questionList: {
    imageUrl: string;
    difficulty: "easy" | "medium" | "hard";
    colors: string[];
  }[];
  setQuestionList: React.Dispatch<React.SetStateAction<IProps["questionList"]>>;
}

function QuestionTable({ questionList, setQuestionList }: IProps) {
  console.log(setQuestionList);

  return (
    <>
      <div className="h-full border-l-[1px] border-zinc-600">
        <div className="w-full bg-zinc-800 text-slate-300 text-lg py-1 flex items-center justify-center gap-8 pl-4 font-bold tracking-[.25em]">
          LIST OF QUESTION
        </div>
        <ul className="w-full flex flex-col h-[calc(100vh-140px)] overflow-auto">
          <li className="w-full text-slate-300 text-md flex gap-4 px-4 py-4 font-bold border-b-2 border-zinc-800">
            <div className="w-2/12 flex flex-col items-center">
              <button className="font-bold text-sm text-yellow-500 py-1 w-full rounded-md border-2 border-yellow-500 hover:bg-yellow-500 hover:text-zinc-800 transition-all">
                Medium
              </button>
              <i className="fa-solid fa-trash text-zinc-600 text-4xl mt-2 hover:text-red-500 transition-all p-2 cursor-pointer"></i>
            </div>
            <div className="flex flex-col items-start">
              <img
                src="https://cssbattle.dev/targets/3@2x.png"
                className="w-[400px]"
              ></img>
              <div className="w-full flex flex-col gap-1 mt-2">
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
          </li>
          {questionList.map((question) => (
            <li className="w-full text-slate-300 text-md flex gap-4 px-4 py-4 font-bold border-b-2 border-zinc-800">
              <div className="w-2/12 flex flex-col items-center">
                <Tag
                  difficulty={question.difficulty}
                  setDifficulty={function (
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    _value: SetStateAction<"easy" | "medium" | "hard">
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                ></Tag>
                <i className="fa-solid fa-trash text-zinc-600 text-4xl mt-2 hover:text-red-500 transition-all p-2 cursor-pointer"></i>
              </div>
              <div className="flex flex-col items-start">
                <img src={question.imageUrl} className="w-[400px]"></img>
                <div className="w-full flex flex-col gap-1 mt-2">
                  <p className="text-slate-300 font-semibold">
                    COLORS IN DESIGN
                  </p>
                  <div className="bg-black p-4 rounded-md">
                    <ul className="w-full h-full flex flex-row flex-wrap gap-y-4">
                      {question.colors.map((color) => (
                        <li className="w-1/2 flex items-center gap-2 cursor-pointer">
                          <div
                            className="w-6 h-6 rounded-full border-2 border-zinc-200"
                            style={{
                              backgroundColor: `#${color}`,
                            }}
                          ></div>
                          <p className="text-slate-300 uppercase">{`#${color}`}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default QuestionTable;
