import { Route, Routes } from "react-router";
import Play from "./pages/Play";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Admin from "./pages/Admin";
import { useEffect } from "react";
import { login } from "./redux/slices/currentUser";
import Account from "./pages/Account";
import Question from "./pages/Question";

function App() {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser.currentUser
  );

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(JSON.parse(`${localStorage.getItem("currentUser")}`));

    if (localStorage.getItem("currentUser")) {
      dispatch(login(JSON.parse(`${localStorage.getItem("currentUser")}`)));
    }
  }, []);
  console.log(currentUser);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        {currentUser.avatarUrl && (
          <Route path="/play/:id" element={<Play></Play>}></Route>
        )}
        {currentUser.role === "admin" && (
          <>
            <Route path="/admin" element={<Admin></Admin>}></Route>
            <Route path="/account" element={<Account></Account>}></Route>
            <Route path="/question" element={<Question></Question>}></Route>
          </>
        )}
        <Route path="*" element={<Home></Home>}></Route>
      </Routes>
    </>
  );
}

export default App;
