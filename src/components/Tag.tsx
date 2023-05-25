interface IProps {
  difficulty: "easy" | "medium" | "hard";
  setDifficulty: React.Dispatch<
    React.SetStateAction<"easy" | "medium" | "hard">
  >;
}

function Tag({ setDifficulty, difficulty }: IProps) {
  return (
    <>
      {difficulty === "easy" && (
        <button
          onClick={() => setDifficulty("easy")}
          className="font-bold text-md text-green-500 py-1 w-full rounded-md border-2 border-green-500 hover:bg-green-500 hover:text-zinc-800 transition-all"
        >
          Easy
        </button>
      )}
      {difficulty === "medium" && (
        <button
          onClick={() => setDifficulty("medium")}
          className="font-bold text-md text-yellow-500 py-1 w-full rounded-md border-2 border-yellow-500 hover:bg-yellow-500 hover:text-zinc-800 transition-all"
        >
          Medium
        </button>
      )}
      {difficulty === "hard" && (
        <button
          onClick={() => setDifficulty("hard")}
          className="font-bold text-md text-red-500 py-1 w-full rounded-md border-2 border-red-500 hover:bg-red-500 hover:text-zinc-800 transition-all"
        >
          Hard
        </button>
      )}
    </>
  );
}

export default Tag;
