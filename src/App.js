import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />}></Route>
      <Route path="/:productId" element={<ProductPage />}></Route>
    </Routes>
  );
};

export default App;
