import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/loginAndRegister/Login";
import Register from "../components/loginAndRegister/Register";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
