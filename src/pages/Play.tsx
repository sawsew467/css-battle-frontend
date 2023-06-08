import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Editor from "../components/Play/Editor";
import Output from "../components/Play/Output";
import Target from "../components/Play/Target";
import Lounge from "../components/Room/Lounge";
import CountdownModal from "../components/CountdownModal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Summary from "../components/Summary";

function Play() {
  const roomStatus = useSelector((state: RootState) => state.room.status);
  const questionList = useSelector(
    (state: RootState) => state.room.questionList
  );
  const questionIndex = useSelector(
    (state: RootState) => state.room.questionIndex
  );

  const [isShowCoundown, setIsShowCoundown] = useState<boolean>(false);

  useEffect(() => {
    questionList.length > 0 && setIsShowCoundown(true);
  }, [questionList]);
  const [codeEditor, setCodeEditor] = useState(`<body>
  <div></div>
</body>
<style>
  body {
    background-color: #62374e;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>`);
  return (
    <>
      {questionIndex === questionList.length && <Summary></Summary>}
      {isShowCoundown && (
        <CountdownModal setIsShowCoundown={setIsShowCoundown}></CountdownModal>
      )}
      {roomStatus === "OPEN" && <Lounge></Lounge>}
      <div className="flex flex-col h-[100vh] justify-between">
        <Header></Header>
        <div className="flex-1 flex flex-row">
          <Editor setCodeEditor={setCodeEditor}></Editor>
          <Output codeEditor={codeEditor}></Output>
          <Target></Target>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Play;
