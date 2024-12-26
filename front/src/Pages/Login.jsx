import React, { useState } from "react";
import { toast } from "react-toastify";
import FirstHeader from "../components/FirstHeader";
import SecondHeader from "../components/SecondHeader";
import ThirdHeader from "../components/ThirdHeader";
import NewsletterSection from "../components/NewsletterSection";
import Footer1 from "../components/Footer1";
import Footer2 from "../components/Footer2";
import { signInWithGoogle } from "./firebase"; 
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const nav=useNavigate() // For handling modal visibility

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        setUser(data.user); // Set user data
        localStorage.setItem("user", JSON.stringify(data.user)); // Save user to localStorage
        toast.success(`Welcome back, ${data.user.username}!`);
        nav('/')
        setShowModal(false); // Close modal if needed
      } else {
        toast.error(data.message || "Login failed.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle(); // Firebase function for Google login
      if (result.success) {
        const response = await fetch(
          "http://localhost:8080/api/auth/google-login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result.user),
          }
        );
        const data = await response.json();
        if (data.success) {
          setUser(data.user); // Set user data
          localStorage.setItem("user", JSON.stringify(data.user)); // Save user to localStorage
          toast.success(`Welcome, ${data.user.username}!`);
          nav('/')
          setShowModal(false); // Close modal if needed
        } else {
          toast.error("Failed to save user data.");
        }
      } else {
        toast.error("Google login failed.");
      }
    } catch (error) {
      toast.error("An error occurred during Google login.");
      console.error(error);
    }
  };

  return (
    <>
      <FirstHeader />
      <SecondHeader />
      <ThirdHeader />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1734532873375-574fd74045c5?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "darken",
        }}
      >
        <div className="bg-gray-900 bg-opacity-50 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="relative mb-6">
              <input
                type="email"
                name="email"
                placeholder="Username or Email Address"
                className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fas fa-user"></i>
              </div>
            </div>

            {/* Password */}
            <div className="relative mb-6">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fas fa-lock"></i>
              </div>
            </div>

            {/* Remember Me and Lost Password */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-gray-400">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-orange-500 focus:ring-orange-500 focus:ring-2 rounded"
                />
                Remember me
              </label>
              <a href="#" className="text-orange-500 text-sm hover:underline">
                Lost password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition-colors mb-4"
            >
              Login
            </button>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2 bg-white text-gray-700 rounded-md font-semibold flex items-center justify-center shadow-md hover:shadow-lg hover:bg-gray-100 transition-colors"
            >
              <img
                src="https://e7.pngegg.com/pngimages/715/371/png-clipart-youtube-google-logo-google-s-google-account-youtube-text-trademark.png"
                alt="Google Logo"
                className="w-6 h-6 mr-2"
              />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
      <NewsletterSection />
      <Footer1 />
      <Footer2 />
    </>
  );
};

export default Login;
