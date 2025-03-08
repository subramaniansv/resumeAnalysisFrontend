import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AdvResume from "../components/AdvResume";
import Footer from "../components/Footer";
import UserDashboard from "../components/userDashboard";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return <div>{isLoggedIn ? <UserDashboard /> : <GuestHome />}</div>;
};

// Home Screen for Guest Users (No Token)
const GuestHome = () => (
  <div>
    <Header />
    <AdvResume />
    <Footer />
  </div>
);

export default Home;
