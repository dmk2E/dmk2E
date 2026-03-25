import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Toolbar } from "@mui/material";
import Navbar from "@/components/Navbar/Navbar";
// 各ページ
import Home from "@/pages/Home/Home";
import Works from "@/pages/Works/Works";

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
        <Route path="/works" element={<Works />}/>
      </Routes>
    </>
  );
}

export default App