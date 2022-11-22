import React from "react";
import { Route, Routes } from "react-router-dom";
import AddRestaurantes from "../components/addRestaurantes/AddRestaurantes";
import Home from "../components/home/Home";
import Search from "../components/home/Search";
import Food from "../components/restaurantAndFoods/Food";
import Orden from "../components/restaurantAndFoods/Orden";
import Restaurant from "../components/restaurantAndFoods/Restaurant";

const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/addRestaurantes" element={<AddRestaurantes />} />
      <Route path="/restaurante/:name" element={<Restaurant />} />
      <Route path="/food/:name" element={<Food />} />
      <Route path="/orden/:name" element={<Orden />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

export default DashboardRouter;
