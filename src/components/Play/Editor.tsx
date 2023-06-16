import ReactCodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { githubDark } from "@uiw/codemirror-theme-github";
import { useDispatch } from "react-redux";
import { setHtmlCode } from "../../redux/slices/room";
import { debounce } from "lodash";

interface IProps {
  setCodeEditor: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValue = `<body>
<div></div>
</body>
<style>
body {
  margin: 0;
  width: 400px;
  height: 300px;
  background: #1A090D;
}
div {
  width: 200px;
  height: 200px;
  background: #ACE894;
}
</style>`;

function Editor({ setCodeEditor }: IProps) {
  const dispatch = useDispatch();
  const handleOnChange = debounce((val: string) => {
    dispatch(setHtmlCode(val));
    // setCodeEditor(val);
  }, 300);
  return (
    <>
      <div className="flex-1 h-[calc(100vh-104px)] max-w-[calc(100vw-896px)] flex flex-col ">
        <div className="w-full bg-zinc-800 text-slate-300 text-lg py-1 flex items-center pl-4 font-bold tracking-[.25em]">
          EDITOR
        </div>
        <div className="flex-1 overflow-auto ">
          <ReactCodeMirror
            theme={githubDark}
            extensions={[html()]}
            width="100%"
            height="100%"
            onChange={(val) => handleOnChange(val)}
            value={defaultValue}
          />
        </div>
      </div>
    </>
  );
}

export default Editor;
