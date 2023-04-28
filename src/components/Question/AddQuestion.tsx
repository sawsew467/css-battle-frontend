import { useState } from "react";
import TagOption from "../TagOption";

interface IProps {
  questionList: {
    imageUrl: string;
    difficulty: "easy" | "medium" | "hard";
    colors: string[];
  }[];
  setQuestionList: React.Dispatch<React.SetStateAction<IProps["questionList"]>>;
}

interface IState {
  difficulty: "easy" | "medium" | "hard";
  color: string;
  colors: IState["color"][];
}

function AddQuestion({ questionList, setQuestionList }: IProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [colors, setColors] = useState<IState["colors"]>([]);
  const [difficulty, setDifficulty] = useState<IState["difficulty"]>("easy");
  const [newColor, setNewColor] = useState<IState["color"]>("");

  const handleAddColor = () => {
    setColors([...colors, newColor]);
    setNewColor("");
  };
  const handleDeleteColor = (pos: number) => {
    setColors(colors.filter((_color, index) => index !== pos));
  };
  const handleChangeColor = (
    e: React.ChangeEvent<HTMLInputElement>,
    pos: number
  ) => {
    setColors(
      colors.map((color, index) => (index === pos ? e.target.value : color))
    );
  };
  const handleAddQuestion = () => {
    const newQuestion = {
      imageUrl,
      colors,
      difficulty,
    };
    setQuestionList([...questionList, newQuestion]);
    setImageUrl("");
    setColors([]);
    setDifficulty("easy");
  };
  return (
    <>
      <div className="flex justify-center flex-1 mt-10">
        <div className="w-11/12">
          <p className="ml-4 text-xl text-slate-300 font-bold tracking-[.25em]">
            ADD NEW QUESTION
          </p>
          <div className="flex flex-col items-start gap-4 px-4 py-4 rounded-br-lg rounded-bl-lg">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-md text-slate-300 font-bold tracking-[.25em]">
                Url Image
              </p>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                type="text"
                className="outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-lg"
              ></input>
            </div>
            <div className="w-full flex flex-row">
              <div className="flex flex-col gap-2 w-1/2">
                <p className="text-md text-slate-300 font-bold tracking-[.25em]">
                  Color
                </p>
                <ul className="w-full flex flex-col gap-2">
                  {colors.map((item, index) => (
                    <li className="w-full flex items-center" key={index}>
                      <div
                        className="w-6 h-6 rounded-full border-2 border-zinc-200 bg-[#fdc57b]"
                        style={{ backgroundColor: "#" + item }}
                      ></div>
                      <p className="text-md text-slate-300 ml-4 mr-2">#</p>
                      <input
                        value={item}
                        onChange={(e) => handleChangeColor(e, index)}
                        type="text"
                        className="w-[92px] outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-md"
                      ></input>
                      <i
                        onClick={() => handleDeleteColor(index)}
                        className="fa-solid fa-trash text-zinc-600 ml-4 hover:text-red-500 transition-all p-2 cursor-pointer"
                      ></i>
                    </li>
                  ))}
                  <li className="w-full flex items-center">
                    {newColor !== "" ? (
                      <div
                        className="w-6 h-6 rounded-full border-2 border-zinc-200 "
                        style={{ backgroundColor: "#" + newColor }}
                      ></div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-zinc-200"></div>
                    )}
                    <p className="text-md text-slate-300 ml-4 mr-2">#</p>
                    <input
                      type="text"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="w-[92px] outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-md"
                    ></input>
                    <i
                      onClick={handleAddColor}
                      className="fa-solid fa-plus text-zinc-600 ml-4 hover:text-slate-500 transition-all p-2 cursor-pointer"
                    ></i>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-2 w-1/2">
                <p className="text-md text-slate-300 font-bold tracking-[.25em]">
                  Difficulty
                </p>
                <div className="flex flex-row justify-between gap-1">
                  <TagOption
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                  ></TagOption>
                </div>
              </div>
            </div>
            <button
              onClick={handleAddQuestion}
              className="w-full text-slate-300 bg-zinc-700 border-none py-2 rounded-md hover:bg-zinc-600 transition-all cursor-pointer"
            >
              ADD QUESTION
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddQuestion;
