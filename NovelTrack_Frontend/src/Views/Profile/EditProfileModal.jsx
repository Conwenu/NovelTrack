// David
import React, { useState, useRef } from 'react';

import axios from 'axios';
const EditProfileModal = ({ isOpen, onClose, onSave, initialData }) => {

  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const [username, setUsername] = useState(initialData?.username || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [error, setError] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [bannerPic, setBannerPic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(initialData?.profilePic || null);
  const [bannerPicPreview, setBannerPicPreview] = useState(initialData?.bannerPic || null);
  const profilePicInputRef = useRef(null);
  const bannerPicInputRef = useRef(null);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setProfilePic(file);
      setProfilePicPreview(URL.createObjectURL(file));
    } else {
      alert('Profile picture must be less than 2MB.');
      event.target.value = null; // Reset the input
      setProfilePic(null);
      setProfilePicPreview(null);
    }
  };

  const handleBannerPicChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setBannerPic(file);
      setBannerPicPreview(URL.createObjectURL(file));
    } else {
      alert('Banner picture must be less than 2MB.');
      event.target.value = null; // Reset the input
      setBannerPic(null);
      setBannerPicPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('description', description);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }
    if (bannerPic) {
      formData.append('bannerPic', bannerPic);
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/users/${user.id}`, {
        username: username,
        email: email,
        description: description
      });

      localStorage.setItem('user', JSON.stringify({ ...response.data }));
      onClose();
      window.location.reload();
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium text-gray-800">Edit Profile</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <input
              type="text"
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture:</label>
            {profilePicPreview && (
              <img
                src={profilePicPreview}
                alt="Profile Preview"
                className="mb-2 h-20 w-20 rounded-full object-cover"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              style={{ display: 'none' }}
              id="profilePicInput"
              ref={profilePicInputRef}
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => profilePicInputRef.current.click()}
            >
              Upload Profile Picture
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Banner Picture:</label>
            {bannerPicPreview && (
              <img
                src={bannerPicPreview}
                alt="Banner Preview"
                className="mb-2 h-20 w-full object-cover"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerPicChange}
              style={{ display: 'none' }}
              id="bannerPicInput"
              ref={bannerPicInputRef}
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => bannerPicInputRef.current.click()}
            >
              Upload Banner Picture
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;