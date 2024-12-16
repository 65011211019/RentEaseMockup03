import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError(""); // Clear previous errors
    setLoading(true); // Start loading

    try {
      const response = await fetch(
        "https://rent-ease-api-beta.vercel.app/api/users",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error details:", errorDetails);
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const users = await response.json();
      const user = users.find(
        (u) => u.user_email === email && u.user_pass === password
      );

      if (user) {
        setError("");
        if (typeof onLogin === "function") {
          onLogin(user); // Call onLogin function
        } else {
          console.error("onLogin is not a function");
        }
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert(`Welcome, ${user.user_name}!`);

        // Navigate to home page after successful login
        navigate("/"); // Navigate to home page

        // Refresh the page to update nav.jsx state
        window.location.reload(); // Refresh the page
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login Failed:", err.message);
      setError(`An error occurred: ${err.message}. Please try again later.`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Navigate to the signup page
  const handleSignUpRedirect = () => {
    navigate("/signup"); // Navigate to signup page
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-md w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-4">Login</h2>
      <div className="space-y-2 w-full">
        <input
          type="email"
          placeholder="Email"
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
        />
      </div>

      <button
        onClick={handleLogin}
        className="bg-pink-500 px-4 py-2 rounded-md text-white hover:bg-pink-600 transition duration-300 mt-4 w-full"
        disabled={loading} // Disable button while loading
      >
        {loading ? "Logging in..." : "Login"} {/* Display loading state */}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Sign-up redirect button */}
      <button
        onClick={handleSignUpRedirect}
        className="text-pink-500 hover:text-pink-600 mt-4"
      >
        Don't have an account? Sign up here
      </button>
    </div>
  );
};

export default Login;
