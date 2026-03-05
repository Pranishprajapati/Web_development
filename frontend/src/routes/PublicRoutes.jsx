import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "../components/layout/PublicLayout";
import Home from "../pages/public/Home";
import Grounds from "../pages/public/Grounds";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/grounds" element={<Grounds />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
