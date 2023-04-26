import { Route, Routes } from "react-router";
import Play from "./pages/Play"

function App() {
  return (
    <>
      <Routes>
        <Route path="/play" element={<Play></Play>}>
        </Route>
      </Routes>
    </>
  )
}

export default App;
