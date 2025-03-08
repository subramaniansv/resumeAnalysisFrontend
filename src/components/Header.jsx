import React from "react";
import { useNavigate } from "react-router-dom";
import headerImg from "../assets/headerimg.jpg";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


const Header = () => {
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/login");
  };

  const handleGoogleSuccess = (response) => {
    const token = response.credential;
    const decoded = jwtDecode(token); // Decode the JWT token

    const userId = decoded.sub; // Unique Google User ID
    const userEmail = decoded.email;
    
    // Store token and userId in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);

    console.log("Google Login Successful:", decoded);

    // Redirect user after login
    navigate("/dashboard"); 
  };

  const handleGoogleFailure = () => {
    console.error("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId="17620946976-4rrb52qsr78dugn2ka6cvo5ontqkros4.apps.googleusercontent.com">
      <div className="flex flex-col lg:flex-row items-center justify-between p-10 max-w-6xl mx-auto">
        {/* Left Side (Text + Buttons) */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2">
          <span className="text-3xl text-slate-700 font-medium my-5">
            Welcome to the Network of Professionals
          </span>

          {/* Google Login Button */}
          <GoogleLogin 
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />

          {/* Email Login Button */}
          <button
            className="hover:bg-slate-300 border rounded-xl py-3 px-6 my-2 w-full max-w-xs"
            onClick={loginHandler}
          >
            Sign in with Email
          </button>
        </div>

        {/* Right Side (Image) */}
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
          <img
            src={headerImg}
            alt="Header"
            className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Header;
