import { SetStateAction } from "react";
import Tag from "../Tag";
import { deleteOneQuestion } from "../../apis/question";

interface IProps {
  questionList: {
    id: string;
    imageUrl: string;
    difficulty: "easy" | "medium" | "hard";
    colors: string[];
  }[];
  setQuestionList: React.Dispatch<React.SetStateAction<IProps["questionList"]>>;
}

function QuestionTable({ questionList }: IProps) {
  const handleDeleteQuestion = async (id: string) => {
    const access_token = localStorage.getItem("access_token");
    await deleteOneQuestion(id, access_token);
  };
  return (
    <>
      <div className="h-full border-l-[1px] border-zinc-600">
        <div className="w-full bg-zinc-800 text-slate-300 text-lg py-1 flex items-center justify-center gap-8 pl-4 font-bold tracking-[.25em]">
          LIST OF QUESTION
        </div>
        <ul className="w-full flex flex-col h-[calc(100vh-140px)] overflow-auto">
          {questionList.map((question) => (
            <li key={question.id} className="w-full text-slate-300 text-md flex gap-4 px-4 py-4 font-bold border-b-2 border-zinc-800">
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
                <i
                  onClick={() => handleDeleteQuestion(question.id)}
                  className="fa-solid fa-trash text-zinc-600 text-4xl mt-2 hover:text-red-500 transition-all p-2 cursor-pointer"
                ></i>
              </div>
              <div className="flex flex-col items-start">
                <img src={question.imageUrl} className="w-[400px]"></img>
                <div className="w-full flex flex-col gap-1 mt-2">
                  <p className="text-slate-300 font-semibold">
                    COLORS IN DESIGN
                  </p>
                  <div className="bg-black p-4 rounded-md">
                    <ul className="w-full h-full flex flex-row flex-wrap gap-y-4">
                      {question.colors.map((color, index) => (
                        <li key={index} className="w-1/2 flex items-center gap-2 cursor-pointer">
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
