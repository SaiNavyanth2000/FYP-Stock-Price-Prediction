import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import PredictPrice from './components/PredictPrice';
import ButtonAppBar from './components/AppBar';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <ButtonAppBar></ButtonAppBar>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/predict" element={<PredictPrice />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
