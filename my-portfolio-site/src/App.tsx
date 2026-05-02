import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Toolbar } from "@mui/material";
import Navbar from "@/components/Navbar/Navbar";
// 各ページ
import Home from "@/pages/Home/Home";
import Works from "@/pages/Works/Works";
import Skill from "@/pages/Skill/Skill";
import Awards from "@/pages/Awards/Awards";
// TanStack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(/* config = */ {
  defaultOptions: {
    queries: {
      retry: 1, 
      // API呼び出し回数の節約と遷移高速化のため Infinity に設定
      staleTime: Infinity, 
      gcTime: Infinity
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <header>
        <Navbar />
      </header>
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/works" element={<Works />}/>
        <Route path="/skill" element={<Skill />}/>
        <Route path="/awards" element={<Awards />}/>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;