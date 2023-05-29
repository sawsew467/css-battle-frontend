import ReactCodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { githubDark } from "@uiw/codemirror-theme-github";

interface IProps {
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValue = `<body>
  <div></div>
</body>
<style>
  body {
    background-color: #62374e;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>`;

function Editor({ setCode }: IProps) {
  return (
    <>
      <div className="flex-1 h-[calc(100vh-104px)] flex flex-col ">
        <div className="w-full bg-zinc-800 text-slate-300 text-lg py-1 flex items-center pl-4 font-bold tracking-[.25em]">
          EDITOR
        </div>
        <div className="flex-1 overflow-auto">
          <ReactCodeMirror
            theme={githubDark}
            extensions={[html()]}
            width="100%"
            height="100%"
            onChange={(val) => setCode(val)}
            value={defaultValue}
          />
        </div>
      </div>
    </>
  );
}

export default Editor;
