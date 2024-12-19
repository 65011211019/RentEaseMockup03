import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(""); // State for user's username
  const [birthday, setBirthday] = useState(""); // State for user's birthday
  const [phoneNumber, setPhoneNumber] = useState(""); // State for user's phone number
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignUp = async () => {
    // Validation checks
    if (!email || !password || !confirmPassword || !username || !birthday || !phoneNumber) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Clear previous errors
    setLoading(true); // Start loading

    try {
      // Create user object to send to the API
      const user = {
        user_name: username,  // Username instead of full name
        user_email: email,
        user_pass: password,
        user_imgurl: "https://i.ibb.co/NCzHn39/user.png", // Default user image URL (can be updated)
        user_birthday: birthday,
        user_numberphone: phoneNumber,
        user_verified: 1, // Assuming user is verified by default
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const response = await fetch("https://rent-ease-api-beta.vercel.app/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error details:", errorDetails);
        throw new Error(`Failed to create user: ${response.statusText}`);
      }

      const newUser = await response.json();

      // After successful sign-up, navigate to login or home page
      alert(`Account created successfully! Welcome, ${newUser.user_name}!`);
      navigate("/login"); // Redirect to login page

    } catch (err) {
      console.error("Sign-up Failed:", err.message);
      setError(`An error occurred: ${err.message}. Please try again later.`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-md w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-4">Sign Up</h2>
      <div className="space-y-2 w-full">
        <input
          type="text"
          placeholder="Username"
          aria-label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          aria-label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
        />
        <input
          type="date"
          placeholder="Birthday"
          aria-label="Birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
        />
        <input
          type="text"
          placeholder="Phone Number"
          aria-label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
        />
      </div>

      <button
        onClick={handleSignUp}
        className="bg-pink-500 px-4 py-2 rounded-md text-white hover:bg-pink-600 transition duration-300 mt-4 w-full"
        disabled={loading} // Disable button while loading
      >
        {loading ? "Signing up..." : "Sign Up"} {/* Display loading state */}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SignUp;
