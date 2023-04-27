import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AddQuestion from "../components/Question/AddQuestion";
import QuestionTable from "../components/Question/QuestionTable";

interface IState {
  question: {
    imageUrl: string;
    difficulty: "easy" | "medium" | "hard";
    colors: string[];
  };
  questionList: IState["question"][];
}

function Question() {
  const [questionList, setQuestionList] = useState<IState["questionList"]>([]);
  return (
    <>
      <div className="flex flex-col h-[100vh] justify-between">
        <Header></Header>
        <div className="flex-1 flex flex-row bg-zinc-900  justify-between">
          <AddQuestion questionList={questionList} setQuestionList={setQuestionList}></AddQuestion>
          <QuestionTable questionList={questionList} setQuestionList={setQuestionList}></QuestionTable>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Question;
