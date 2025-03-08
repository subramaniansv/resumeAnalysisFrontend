import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UploadResume from "./pages/UploadResume";
import JobSearch from "./pages/JobSearch";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
const AppContent = () => {
  const location = useLocation();
  const hideNav = ["/login"];

  return (
    <>
      {!hideNav.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/analyze-resume" element={<UploadResume />} />
        <Route path="/search-jobs" element={<JobSearch />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
