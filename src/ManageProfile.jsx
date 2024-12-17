import React, { useEffect, useState } from "react";
import axios from "axios";

function ManageProfile() {
  const [userData, setUserData] = useState(null); // User data
  const [isEditing, setIsEditing] = useState(false); // Edit mode
  const [formData, setFormData] = useState({}); // Form data
  const [loading, setLoading] = useState(true); // Loading state
  const [userId, setUserId] = useState(null); // User ID

  // Retrieve userId from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUserId(parsedUser.user_id);
    }
  }, []);

  // Fetch user data when userId is available
  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `https://rent-ease-api-beta.vercel.app/api/user/${userId}`
          );
          setUserData(response.data);
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, [userId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Update user data
  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.put(
        `https://rent-ease-api-beta.vercel.app/api/user/${userId}`,
        formData
      );
      setUserData(formData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (!userData) {
    return <div className="text-center text-red-500 mt-10">User data not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-gray-50 rounded-lg shadow-lg px-4 md:px-8">
  <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Manage Profile</h1>
  {!isEditing ? (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <p className="text-lg"><strong>Name:</strong> {userData.user_name}</p>
      </div>
      <div className="flex justify-between items-center border-b pb-2">
        <p className="text-lg"><strong>Email:</strong> {userData.user_email}</p>
      </div>
      <div className="flex justify-between items-center border-b pb-2">
        <p className="text-lg"><strong>Phone:</strong> {userData.user_numberphone}</p>
      </div>
      <div className="flex justify-between items-center border-b pb-2">
        <p className="text-lg">
          <strong>Birthday:</strong> {new Date(userData.user_birthday).toLocaleDateString()}
        </p>
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Edit Profile
      </button>
    </div>
  ) : (
    <div className="space-y-4">
      <div className="mb-2">
        <label className="block font-semibold mb-1">Name:</label>
        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleInputChange}
          className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-2">
        <label className="block font-semibold mb-1">Email:</label>
        <input
          type="email"
          name="user_email"
          value={formData.user_email}
          onChange={handleInputChange}
          className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-2">
        <label className="block font-semibold mb-1">Phone:</label>
        <input
          type="text"
          name="user_numberphone"
          value={formData.user_numberphone}
          onChange={handleInputChange}
          className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-2">
        <label className="block font-semibold mb-1">Birthday:</label>
        <input
          type="date"
          name="user_birthday"
          value={formData.user_birthday.split("T")[0]}
          onChange={handleInputChange}
          className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
        >
          Save
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  )}
</div>

  );
}

export default ManageProfile;
