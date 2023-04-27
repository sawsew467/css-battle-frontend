import { useState } from "react";
import Logo from "../assets/images/header/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/currentUser";
import { useNavigate } from "react-router";

interface IProps {
  setIsShowLoginModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ setIsShowLoginModal }: IProps) {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.currentUser
  );

  const [isShow, setIsShow] = useState(false);

  const handleLoginClick = () => {
    setIsShowLoginModal && setIsShowLoginModal(true);
    setIsShow(false);
  };
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    dispatch(logout());
    window.location.reload();
  };
  const navigate = useNavigate();
  const handleManagementClick = () => {
    navigate("/admin");
  };
  return (
    <div className="w-[100vw] h-[64px] px-4 bg-black flex items-center justify-between">
      <a href="/">
        <img src={Logo}></img>
      </a>
      {currentUser.username ? (
        <div
          className="relative z-30 bg-slate-700 px-3 py-2 flex flex-row items-center rounded-md cursor-pointer hover:bg-slate-600 transition-all"
          onClick={() => setIsShow(!isShow)}
        >
          <img
            className="w-7 h-7 rounded-full object-fit"
            src={currentUser.avatarUrl}
          ></img>
          <p className="text-white font-semibold mx-3">
            {currentUser.username}
          </p>
          <i className="fa-sharp fa-solid fa-caret-down text-slate-400"></i>
          {isShow && (
            <div className="flex flex-col items-end absolute z-20 right-0 top-[48px] rounded-md">
              <div
                onClick={handleManagementClick}
                className=" h-[44px] w-full bg-slate-700 px-3 py-2 flex flex-row items-center gap-3 rounded-tl-md rounded-tr-md cursor-pointer hover:bg-slate-600 transition-all"
              >
                <p className="text-white font-semibold">Management</p>
                <i className="fa-solid fa-right-from-bracket text-slate-400"></i>
              </div>
              <div
                onClick={handleLogoutClick}
                className=" h-[44px] w-full bg-slate-700 px-3 py-2 flex flex-row justify-end items-center gap-3 rounded-bl-md rounded-br-md cursor-pointer hover:bg-slate-600 transition-all"
              >
                <p className="text-white font-semibold">Log out</p>
                <i className="fa-solid fa-right-from-bracket text-slate-400"></i>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className="relative z-30 bg-slate-700 px-3 py-2 flex flex-row items-center gap-3 rounded-md cursor-pointer hover:bg-slate-600 transition-all"
          onClick={handleLoginClick}
        >
          <p className="text-white font-semibold">Log in</p>
        </div>
      )}
    </div>
  );
}

export default Header;
