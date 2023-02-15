
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Generate from "./pages/generate/Generate";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Register/>} /> 
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} /> 
      <Route path="/home" element={<Generate/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
