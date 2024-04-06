import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Index } from "./pages/Index";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <Routes>
      <Route path="" element={<Index />} />
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="home" element={<Home />} />
    </Routes>
  );
};
