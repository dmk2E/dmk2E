import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css"
import App from "./App.tsx"

// React用の描画エンジン
ReactDOM.createRoot(/* container = */document.getElementById('root')!).render(/* children = */ 
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)