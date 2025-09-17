import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/loginimage.jpg";


export default function LoginPage({ setAuthUser }) {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (username && email && password) {
        setAuthUser({ username, email });
        navigate("/");
      } else {
        setError("Please fill all fields to sign up.");
      }
    } else {
      if (username && password) {
        setAuthUser({ username });
        navigate("/");
      } else {
        setError("Username and password required for login.");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "Nunito, 'Segoe UI', 'Roboto', 'Arial', sans-serif",
      }}
    >
      <div className="bg-white bg-opacity-80 rounded-3xl shadow-gold p-12 max-w-lg w-full backdrop-blur-sm animate-fadeInUp">
        <h2
          className="mb-10 text-center text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-yellow-500 to-orange-400 drop-shadow-lg animate-gradientX font-serif"
          style={{ fontFamily: "'Marcellus', serif" }}
        >
          {isSignup ? "Join Kolam Studio" : "Welcome"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-start animate-slideInLeft">
            <label
              htmlFor="username"
              className="block mb-2 font-semibold text-xl text-yellow-700"
              style={{ letterSpacing: "1px" }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              required
              autoComplete="username"
              className="w-full rounded-lg border-2 border-yellow-400 px-5 py-3 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:border-orange-500 text-lg transition duration-300 bg-yellow-50 shadow-sm"
            />
          </div>

          {isSignup && (
            <div className="flex flex-col items-start animate-slideInLeft">
              <label
                htmlFor="email"
                className="block mb-2 font-semibold text-xl text-yellow-700"
                style={{ letterSpacing: "1px" }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full rounded-lg border-2 border-yellow-400 px-5 py-3 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:border-orange-500 text-lg transition duration-300 bg-yellow-50 shadow-sm"
              />
            </div>
          )}

          <div className="flex flex-col items-start animate-slideInLeft">
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-xl text-yellow-700"
              style={{ letterSpacing: "1px" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete={isSignup ? "new-password" : "current-password"}
              className="w-full rounded-lg border-2 border-yellow-400 px-5 py-3 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:border-orange-500 text-lg transition duration-300 bg-yellow-50 shadow-sm"
            />
          </div>

          {error && (
            <p className="text-center text-red-600 font-bold animate-pulse text-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 text-white text-2xl font-extrabold py-3 rounded-xl shadow-md hover:shadow-pink-500 hover:scale-105 transform transition duration-300 animate-pop"
            style={{ fontFamily: "'Marcellus', serif" }}
          >
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        <p
          className="mt-8 text-center text-orange-600 font-semibold cursor-pointer underline hover:text-pink-600 transition-all duration-300 text-lg animate-bounce"
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
          }}
          aria-label="Toggle between sign up and login"
        >
          {isSignup ? "Already have an account? Login" : "First time here? Sign Up"}
        </p>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(50px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s cubic-bezier(0.77,0,0.175,1) both;
          }
          @keyframes gradientX {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          .animate-gradientX {
            background-size: 200% 200%;
            animation: gradientX 2s infinite alternate linear;
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slideInLeft {
            animation: slideInLeft 0.5s ease-out forwards;
          }
          @keyframes pop {
            0% { transform: scale(0.8); }
            80% { transform: scale(1.08);}
            100% { transform: scale(1);}
          }
          .animate-pop {
            animation: pop 0.5s cubic-bezier(.2,.68,.31,1.21) both;
          }
        `}
      </style>
    </div>
  );
}