import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Panel } from "./pages/Panel";

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/panel/:id" element={<Panel />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;

//<Route path="" element={<Home />} />
