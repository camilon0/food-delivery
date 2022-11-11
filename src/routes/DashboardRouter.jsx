import React from "react";
import { Route, Routes } from "react-router-dom";
import AddRestaurantes from "../components/addRestaurantes/AddRestaurantes";
import Home from "../components/home/Home";

const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/addRestaurantes" element={<AddRestaurantes />} />
    </Routes>
  );
};

export default DashboardRouter;
