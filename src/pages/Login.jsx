import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import {useNavigate} from'react-router-dom';
const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate('');
  const handleSubmit = async (event) =>{
    event.preventDefault();
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

    if(isLogin){
      try {
        const res = await axios.post(`${apiUrl}/api/user/login`, { email, password });
          toast.success("Login successfull");
          console.log(res.data);
          localStorage.setItem("token",res.data.token);
          localStorage.setItem("userId", res.data.userId);
          navigate("/");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }else{
      try {
        const res = await axios.post(`${apiUrl}/api/user/register`,{name,email,password});
        toast.success("Sign up successful");
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("userId", res.data.userId)
        navigate("/");
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error)
      }
    }   
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {
          isLogin ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <h1 className="text-xl font-semibold text-center">Welcome Back!</h1>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                Login
              </button>
              <p className="text-sm text-center">
                Don't have an account?{" "}
                <span className="text-blue-500 cursor-pointer" onClick={() => setIsLogin(false)}>
                  Sign Up
                </span>
              </p>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <h1 className="text-xl font-semibold text-center">Welcome!</h1>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-green-600"
                >
                Sign Up
              </button>
              <p className="text-sm text-center">
                Already have an account?{" "}
                <span className="text-blue-500 cursor-pointer" onClick={() => setIsLogin(true)}>
                  Login
                </span>
              </p>
            </form>
          )
        }
      </div>
    </div>
  );
};

export default Login;
