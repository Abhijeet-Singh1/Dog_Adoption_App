import "./App.css";
import Login from "./components/Login/login";
import HomePage from "./components/HomePage/homePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage></HomePage>} />
          <Route path="/" element={<Login></Login>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
