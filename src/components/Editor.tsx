import ReactCodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { githubDark } from "@uiw/codemirror-theme-github";

interface IProps {
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

function Editor({ setCode }: IProps) {
  return (
    <>
      <div className="flex-1 h-[calc(100vh-104px)] flex flex-col ">
        <div className="w-full bg-zinc-800 text-slate-300 text-lg h-9 flex items-center pl-4 font-bold tracking-[.25em]">
          EDITOR
        </div>
        <div className="flex-1 overflow-auto">
          <ReactCodeMirror
            theme={githubDark}
            extensions={[html()]}
            width="100%"
            height="100%"
            onChange={(val) => setCode(val)}
          />
        </div>
      </div>
    </>
  );
}

export default Editor;
