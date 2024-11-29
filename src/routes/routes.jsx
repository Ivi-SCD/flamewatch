import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home }  from "../pages/home/home.jsx";
import { Dashboard }  from "../pages/dashboard/dashboard.jsx";


export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
    
      </Routes>
    </BrowserRouter>
  );
};