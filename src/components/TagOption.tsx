interface IProps {
    difficulty: "easy" | "medium" | "hard";
    setDifficulty: React.Dispatch<
      React.SetStateAction<"easy" | "medium" | "hard">
    >;
  }
  
  function TagOption({ setDifficulty, difficulty }: IProps) {
    return (
      <>
        {difficulty === "easy" ? (
          <button
            onClick={() => setDifficulty("easy")}
            className="bg-green-500 text-zinc-800 font-bold text-md py-1 w-1/3 rounded-md border-2 border-green-500 hover:bg-green-500 hover:text-zinc-800 transition-all"
          >
            Easy
          </button>
        ) : (
          <button
            onClick={() => setDifficulty("easy")}
            className="font-bold text-md text-green-500 py-1 w-1/3 rounded-md border-2 border-green-500 hover:bg-green-500 hover:text-zinc-800 transition-all"
          >
            Easy
          </button>
        )}
  
        {difficulty === "medium" ? (
          <button
            onClick={() => setDifficulty("medium")}
            className="bg-yellow-500 text-zinc-800 font-bold text-md py-1 w-1/3 rounded-md border-2 border-yellow-500 hover:bg-yellow-500 hover:text-zinc-800 transition-all"
          >
            Medium
          </button>
        ) : (
          <button
            onClick={() => setDifficulty("medium")}
            className="font-bold text-md text-yellow-500 py-1 w-1/3 rounded-md border-2 border-yellow-500 hover:bg-yellow-500 hover:text-zinc-800 transition-all"
          >
            Medium
          </button>
        )}
        {difficulty === "hard" ? (
          <button
            onClick={() => setDifficulty("hard")}
            className="bg-red-500 text-zinc-800 font-bold text-md py-1 w-1/3 rounded-md border-2 border-red-500 hover:bg-red-500 hover:text-zinc-800 transition-all"
          >
            Hard
          </button>
        ) : (
          <button
            onClick={() => setDifficulty("hard")}
            className="font-bold text-md text-red-500 py-1 w-1/3 rounded-md border-2 border-red-500 hover:bg-red-500 hover:text-zinc-800 transition-all"
          >
            Hard
          </button>
        )}
      </>
    );
  }
  
  export default TagOption;
  