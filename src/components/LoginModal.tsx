import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/currentUser";
import { loginAccount } from "../apis/auth";
import { Validationschema } from "../utils/yupValidation";
import { ValidationError } from "yup";
import axios from "axios";
import { showSnackbar } from "../redux/slices/app";

interface IProps {
  setIsShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginModal({ setIsShowLoginModal, setIsShowRegisterModal }: IProps) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const handleLogin = async (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e && e.preventDefault();
    try {
      await Validationschema.validate(input, { abortEarly: false });
      setIsLoading(true);
      const loginResponse = await loginAccount(input);
      const { user, token } = loginResponse.data.data;
      dispatch(
        login({
          ...user,
          access_token: token.accessToken,
          refresh_token: token.refreshToken,
        })
      );
      // setTimeout(() => {
        setIsLoading(false);
        setIsShowLoginModal(false);
        dispatch(
          showSnackbar({
            open: true,
            message: "Login successfully!",
            type: "success",
          })
        );
      // }, 500);
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        if (error?.name === "ValidationError") {
          dispatch(
            showSnackbar({
              open: true,
              message: error.errors[0],
              type: "error",
            })
          );
        }
      }
      if (axios.isAxiosError(error)) {
        console.log(error);
        if (
          error.response?.status === 401 ||
          error.response?.status === 404 ||
          error.response?.status === 400
        ) {
          dispatch(
            showSnackbar({
              open: true,
              message: "Username or password is incorrect!!!",
              type: "error",
            })
          );
        }
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  const handleRegisterClick = () => {
    setIsShowLoginModal(false);
    setIsShowRegisterModal(true);
  };
  const handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Enter") {
      event.preventDefault();
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
          <form className="flex flex-col items-start gap-4 px-4 py-8 rounded-br-lg rounded-bl-lg">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-md text-slate-300 font-bold tracking-[.25em]">
                Username
              </label>
              <input
                onChange={(e) =>
                  setInput({ ...input, username: e.target.value })
                }
                type="text"
                className="outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-lg"
              ></input>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-md text-slate-300 font-bold tracking-[.25em]">
                Password
              </label>
              <input
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
                onKeyDown={(e) => handleEnterPress(e)}
                type="password"
                className="outline-none bg-black border-2 border-zinc-600 text-slate-300 px-2 py-1 rounded-md text-lg"
              ></input>
            </div>
            <div className="flex flex-col w-full items-center">
              {isLoading ? (
                <button className="relative w-full h-10 text-zinc-800 font-bold bg-zinc-500 border-none py-2 rounded-md transition-all">
                  <span className="absolute top-2 right-[calc(50%-12px)] loader"></span>
                </button>
              ) : (
                <button
                  onClick={(e) => handleLogin(e)}
                  type="submit"
                  className="relative w-full text-zinc-800 font-bold bg-primary border-none py-2 rounded-md hover:bg-blue-400 transition-all"
                >
                  <p>LOGIN</p>
                </button>
              )}
              <span className="text-zinc-500 text-sm my-2">
                Don't have account?
              </span>
              <button
                onClick={handleRegisterClick}
                className="w-full text-primary font-bold border-2 border-primary py-2 rounded-md hover:bg-zinc-800 transition-all"
              >
                REGISTER
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
