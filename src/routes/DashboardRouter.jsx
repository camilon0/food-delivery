import React from "react";
import { Route, Routes } from "react-router-dom";
import AddRestaurantes from "../components/addRestaurantes/AddRestaurantes";
import Home from "../components/home/Home";
import Search from "../components/home/Search";
import Restaurant from "../components/restaurantAndFoods/Restaurant";

const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/addRestaurantes" element={<AddRestaurantes />} />
      <Route path="/restaurante/:name" element={<Restaurant />} />
    </Routes>
  );
};

export default DashboardRouter;
