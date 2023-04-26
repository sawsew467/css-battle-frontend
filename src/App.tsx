import { Route, Routes } from "react-router";
import Play from "./pages/Play";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/play/:id" element={<Play></Play>}></Route>
      </Routes>
    </>
  );
}

export default App;
