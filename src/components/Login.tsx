import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/currentUser";
import { faker } from "@faker-js/faker";

interface IProps {
  setIsShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login({ setIsShowLoginModal }: IProps) {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const handleLogin = () => {
    dispatch(
      login({
        ...input,
        avatarUrl: faker.image.avatar(),
      })
    );
    setIsShowLoginModal(false);
  };
  const handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Enter") {
      handleLogin();
    }
  };
  return (
    <>
      <div className="w-[100vw] h-[100vh] fixed z-50 bg-overlay flex justify-center items-center  drop-shadow-2xl">
        <div className="flex flex-col min-w-[480px] bg-zinc-900 rounded-lg">
          <div className=" bg-zinc-800 px-4 py-2 flex justify-between items-center rounded-tl-lg rounded-tr-lg">
            <p className="text-xl text-slate-300 font-bold tracking-[.25em]">
              LOGIN
            </p>
            <button
              className="cursor-pointer"
              onClick={() => setIsShowLoginModal(false)}
            >
              <i className="fa-solid fa-xmark text-slate-300 text-2xl"></i>
            </button>
          </div>
          <div className="flex flex-col items-start gap-4 px-4 py-8 rounded-br-lg rounded-bl-lg">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-md text-slate-300 font-bold tracking-[.25em]">
                username
              </p>
              <input
                onChange={(e) =>
                  setInput({ ...input, username: e.target.value })
                }
                type="text"
                className="outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-lg"
              ></input>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <p className="text-md text-slate-300 font-bold tracking-[.25em]">
                Password
              </p>
              <input
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
                onKeyDown={(e) => handleEnterPress(e)}
                type="password"
                className="outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-lg"
              ></input>
            </div>
            <button
              onClick={handleLogin}
              className="w-full text-slate-300 bg-zinc-700 border-none py-2 rounded-md hover:bg-zinc-600 transition-all"
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
