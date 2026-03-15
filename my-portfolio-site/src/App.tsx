import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import "./App.css";
import { Toolbar } from "@mui/material";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Toolbar />
      {/* FIXME: ルーティングの設定はここで */}
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </>
  );
}

export default App