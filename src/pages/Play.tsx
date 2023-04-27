import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Editor from "../components/Play/Editor";
import Output from "../components/Play/Output";
import Target from "../components/Play/Target";
import Lounge from "../components/Lounge";
import CountdownModal from "../components/CountdownModal";

function Play() {
  const [code, setCode] = useState<string>("");
  const [isShowLounge, setIsShowLounge] = useState<boolean>(true);
  const [isShowCoundown, setIsShowCoundown] = useState<boolean>(false);

  useEffect(() => {
    !isShowLounge && setIsShowCoundown(true);
  }, [isShowLounge]);
  return (
    <>
      {isShowLounge && <Lounge setIsShowLounge={setIsShowLounge}></Lounge>}
      {isShowCoundown && (
        <CountdownModal setIsShowCoundown={setIsShowCoundown}></CountdownModal>
      )}
      <div className="flex flex-col h-[100vh] justify-between">
        <Header></Header>
        <div className="flex-1 flex flex-row">
          <Editor setCode={setCode}></Editor>
          <Output code={code}></Output>
          <Target></Target>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Play;
