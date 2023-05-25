import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AddQuestion from "../components/Question/AddQuestion";
import QuestionTable from "../components/Question/QuestionTable";
import { getAllQuestion } from "../apis/question";

interface IState {
  question: {
    id: string;
    imageUrl: string;
    difficulty: "easy" | "medium" | "hard";
    colors: string[];
  };
  questionList: IState["question"][];
}

function Question() {
  const [questionList, setQuestionList] = useState<IState["questionList"]>([]);
  const fetchQuestionList = async () => {
    const access_token = localStorage.getItem("access_token");
    const res = await getAllQuestion(access_token);
    setQuestionList(res?.data?.data);
  };
  useEffect(() => {
    fetchQuestionList();
  }, [questionList]);
  return (
    <>
      <div className="flex flex-col h-[100vh] justify-between">
        <Header></Header>
        <div className="flex-1 flex flex-row bg-zinc-900  justify-between">
          <AddQuestion
          ></AddQuestion>
          <QuestionTable
            questionList={questionList}
            setQuestionList={setQuestionList}
          ></QuestionTable>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Question;
