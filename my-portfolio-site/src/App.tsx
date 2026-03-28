import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Toolbar } from "@mui/material";
import Navbar from "@/components/Navbar/Navbar";
// 各ページ
import Home from "@/pages/Home/Home";
import Works from "@/pages/Works/Works";
import Skill from "@/pages/Skill/Skill";
import Awards from "@/pages/Awards/Awards";

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
        <Route path="/skill" element={<Skill />}/>
        <Route path="/awards" element={<Awards />}/>
      </Routes>
    </>
  );
}

export default App;