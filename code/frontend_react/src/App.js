import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import PredictPrice from "./components/PredictPrice";
import ButtonAppBar from "./components/AppBar";

function App() {
  return (
    <>
      <Router>
        <ButtonAppBar></ButtonAppBar>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/predict" element={<PredictPrice />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
