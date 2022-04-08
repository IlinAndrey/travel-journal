import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="*" element={ <App /> }>
      </Route>
    </Routes>
  </BrowserRouter>
</React.StrictMode>);