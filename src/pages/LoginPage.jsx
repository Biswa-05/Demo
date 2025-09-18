

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";

export default function LoginPage({ setAuthUser }) {
  const [mode, setMode] = useState("login"); // 'login' | 'signup' | 'forgot' | 'otp' | 'reset' | 'continue'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpStep, setOtpStep] = useState(0); // 0: enter email, 1: enter otp, 2: choose action
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  function handleLogin(e) {
    e.preventDefault();
    if (username && password) {
      setAuthUser({ username });
      navigate(from, { replace: true });
    } else {
      setError("Please enter username and password.");
    }
  }

  function handleSignup(e) {
    e.preventDefault();
    if (email && username && password) {
      setAuthUser({ username, email });
      navigate(from, { replace: true });
    } else {
      setError("Please fill all fields.");
    }
  }

  function handleForgot(e) {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    // Simulate OTP generation
    const fakeOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(fakeOtp);
    setOtpStep(1);
    setError("");
  }

  function handleOtp(e) {
    e.preventDefault();
    if (otp === generatedOtp) {
      setOtpStep(2);
      setError("");
    } else {
      setError("Invalid OTP. Try again.");
    }
  }

  function handleResetPassword(e) {
    e.preventDefault();
    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }
    // Simulate password update
    setPassword(newPassword);
    setOtpStep(3); // done
    setError("");
  }

  function handleContinue() {
    setMode("login");
    setOtpStep(0);
    setEmail("");
    setOtp("");
    setGeneratedOtp("");
    setNewPassword("");
    setError("");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-center mb-6 gap-4">
          <button
            className={`font-bold text-lg px-4 py-1 rounded ${mode === "login" ? "bg-orange-200" : "bg-gray-100"}`}
            onClick={() => { setMode("login"); setError(""); }}
            disabled={mode === "login"}
          >
            Login
          </button>
          <button
            className={`font-bold text-lg px-4 py-1 rounded ${mode === "signup" ? "bg-orange-200" : "bg-gray-100"}`}
            onClick={() => { setMode("signup"); setError(""); }}
            disabled={mode === "signup"}
          >
            Sign Up
          </button>
        </div>

        {mode === "login" && (
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <input
              className="w-full mb-4 p-2 border rounded"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              className="w-full mb-4 p-2 border rounded"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className="flex items-center mb-4">
              <input type="checkbox" id="showpass" checked={showPassword} onChange={() => setShowPassword(v => !v)} />
              <label htmlFor="showpass" className="ml-2 text-sm">Show Password</label>
            </div>
            <Button type="submit" variant="primary" className="w-full mb-2">
              Login
            </Button>
            <button
              type="button"
              className="text-blue-600 underline text-sm w-full text-center mt-2"
              onClick={() => { setMode("forgot"); setOtpStep(0); setError(""); }}
            >
              Forgot password?
            </button>
          </form>
        )}

        {mode === "signup" && (
          <form onSubmit={handleSignup}>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <input
              className="w-full mb-4 p-2 border rounded"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              className="w-full mb-4 p-2 border rounded"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              className="w-full mb-4 p-2 border rounded"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className="flex items-center mb-4">
              <input type="checkbox" id="showpass2" checked={showPassword} onChange={() => setShowPassword(v => !v)} />
              <label htmlFor="showpass2" className="ml-2 text-sm">Show Password</label>
            </div>
            <Button type="submit" variant="primary" className="w-full mb-2">
              Sign Up
            </Button>
          </form>
        )}

        {mode === "forgot" && (
          <form onSubmit={handleForgot}>
            <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {otpStep === 0 && (
              <>
                <input
                  className="w-full mb-4 p-2 border rounded"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <Button type="submit" variant="primary" className="w-full mb-2">
                  Send OTP
                </Button>
              </>
            )}
            {otpStep === 1 && (
              <>
                <div className="mb-2 text-green-700 text-sm">OTP sent to your email! (Demo OTP: <b>{generatedOtp}</b>)</div>
                <input
                  className="w-full mb-4 p-2 border rounded"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                />
                <Button onClick={handleOtp} variant="primary" className="w-full mb-2">
                  Verify OTP
                </Button>
              </>
            )}
            {otpStep === 2 && (
              <>
                <div className="mb-4 text-green-700">OTP verified!</div>
                <div className="mb-2">Do you want to update your password or continue as it is?</div>
                <div className="flex gap-2">
                  <Button onClick={() => setOtpStep(4)} variant="primary" className="w-full mb-2">Update Password</Button>
                  <Button onClick={handleContinue} variant="secondary" className="w-full mb-2">Continue</Button>
                </div>
              </>
            )}
            {otpStep === 4 && (
              <form onSubmit={handleResetPassword}>
                <input
                  className="w-full mb-4 p-2 border rounded"
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <Button type="submit" variant="primary" className="w-full mb-2">Update Password</Button>
              </form>
            )}
            {otpStep === 3 && (
              <>
                <div className="mb-4 text-green-700">Password updated successfully!</div>
                <Button onClick={handleContinue} variant="primary" className="w-full mb-2">Back to Login</Button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
