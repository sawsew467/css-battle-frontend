import Header from "../components/Header";
import Footer from "../components/Footer";
import Editor from "../components/Editor";
import Output from "../components/Output";
import Target from "../components/Target";
import { useState } from "react";

function Play() {
    const [code, setCode] = useState<string>("");
    
    
  return (
    <>
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
