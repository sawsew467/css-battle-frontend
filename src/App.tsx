import { Route, Routes } from "react-router";
import Play from "./pages/Play";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        {currentUser.avatarUrl && (
          <Route path="/play/:id" element={<Play></Play>}></Route>
        )}
        <Route path="*" element={<Home></Home>}></Route>
      </Routes>
    </>
  );
}

export default App;
