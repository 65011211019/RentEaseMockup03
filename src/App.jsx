import React, { useState, useEffect } from "react";
import Nav from "./nav";
import Footer from "./Footer"; // Import Footer component
import Login from "./login"; // Import Login component
import SignUp from "./SignUp"; // Import SignUp component
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage"; // Import HomePage component

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Check if the user is logged in (can be improved by checking more securely)
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-dark-bg flex flex-col relative">
        {/* Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-pink-to-black-start to-pink-to-black-end rounded-b-[20rem] z-[-1]"></div>

        {/* Header (Nav) */}
        <Nav loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />

        {/* Main Content Wrapper */}
        <Routes>
          {/* Route for login */}
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />

          {/* Route for sign-up */}
          <Route path="/signup" element={<SignUp />} /> {/* Add this route */}

          {/* Default route for Home */}
          <Route
            path="/"
            element={
              <HomePage /> // Always show HomePage, regardless of login status
            }
          />
        </Routes>

        {/* Footer Section */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
