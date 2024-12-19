import React, { useEffect, useState } from "react";
import axios from "axios";
import imageCompression from 'browser-image-compression'; // Import ไลบรารี

function ManageProfile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [oldImageId, setOldImageId] = useState("");
  const [isUploading, setIsUploading] = useState(false); // State for uploading status
  const imgbbAPIKey = "1c0006ef8fc002b4e7177e2181f7d4fc";

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUserId(parsedUser.user_id);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `https://rent-ease-api-beta.vercel.app/api/user/${userId}`
          );
          setUserData(response.data);
          setFormData(response.data);
          setOldImageId(response.data.user_img_id);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file change, compress the image, then upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const options = {
      maxSizeMB: 1, // ควบคุมขนาดไฟล์ไม่ให้เกิน 1MB
      maxWidthOrHeight: 800, // กำหนดขนาดสูงสุดที่ความกว้างหรือความสูง
      useWebWorker: true
    };

    setIsUploading(true); // Start uploading

    try {
      // Compress image
      const compressedFile = await imageCompression(file, options);

      const formData = new FormData();
      formData.append("image", compressedFile);

      // Delete old image before uploading the new one
      if (oldImageId) {
        await axios.delete(`https://api.imgbb.com/1/delete/${oldImageId}?key=${imgbbAPIKey}`);
        console.log("Old image deleted successfully");
      }

      // Upload compressed image
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );
      setUploadedImageUrl(response.data.data.url);
      setOldImageId(response.data.data.id);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false); // End uploading
    }
  };

  const handleUpdate = async () => {
    if (isUploading) {
      alert("Please wait for the image to upload before saving!");
      return;
    }

    try {
      setLoading(true);
      const updateData = {
        ...formData,
        user_imgurl: uploadedImageUrl || userData.user_imgurl,
        user_img_id: uploadedImageUrl ? oldImageId : userData.user_img_id,
      };
      console.log("Update Data:", updateData);
      await axios.put(
        `https://rent-ease-api-beta.vercel.app/api/user/${userId}`,
        updateData
      );
      setUserData(updateData);
      setIsEditing(false);
      alert("Profile updated successfully!");

      const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const updatedUser = { ...savedUser, ...updateData };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      window.location.reload();
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
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Manage Profile
      </h1>
      <div className="flex justify-center items-center mb-6">
        <img
          src={userData.user_imgurl || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full"
        />
      </div>
      {!isEditing ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-lg">
              <strong>Name:</strong> {userData.user_name}
            </p>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-lg">
              <strong>Email:</strong> {userData.user_email}
            </p>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-lg">
              <strong>Phone:</strong> {userData.user_numberphone}
            </p>
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
          <div className="mb-2">
            <label className="block font-semibold mb-1">Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2 rounded w-full focus:ring focus:ring-blue-300"
            />
            {uploadedImageUrl && (
              <div className="mt-4">
                <p>Uploaded Image:</p>
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded"
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
              disabled={isUploading} // Disable save if uploading
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
