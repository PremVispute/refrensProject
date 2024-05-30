import React from "react";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './styles/globals.css';
import './styles/variables.css';
import './styles/mixins.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
