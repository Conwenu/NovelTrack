// David
import React, { useState, useEffect } from "react";
import ProfileTabs from "./ProfileTabs";
import ProfileHeader from "./ProfileHeader";
import ProfileBio from "./ProfileBio";
import { useParams } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
export default function Profile() {
  const { userId } = useParams();
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    ...user,
    profilePic: "https://contentful.harrypotter.com/usf1vwtuqyxm/3SQ3X2km8wkQIsQWa02yOY/8801d7055a3e99dae8e60f54bb4b1db8/HarryPotter_WB_F4_HarryPotterMidshot_Promo_080615_Port.jpg?q=75&fm=jpg&w=914",
    bannerPic: "https://i.redd.it/0zroee6x5ft91.jpg",
  });
  console.log(user)
  const handleSaveProfile = (formData) => {
    // Process the form data (e.g., send it to an API)
    console.log(
      "Form Data:",
      formData.get("username"),
      formData.get("email"),
      formData.get("profilePic"),
      formData.get("bannerPic"),
      formData.get("description")
    );

    // Update the profile data with the new values
    setProfileData({
      username: formData.get("username"),
      email: formData.get("email"),
      description: formData.get("description"),
      profilePic: formData.get("profilePic")
        ? URL.createObjectURL(formData.get("profilePic"))
        : profileData.profilePic,
      bannerPic: formData.get("bannerPic")
        ? URL.createObjectURL(formData.get("bannerPic"))
        : profileData.bannerPic,
    });

    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="min-h-screen bg-background w-full">
      <ProfileHeader />

      <div className="mt-20 px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between">
          <ProfileBio />

          {userData && parseInt(user.id) === parseInt(userId) && (
            <>
              <div className="mt-6 md:mt-0">
                <button
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition"
                  onClick={handleOpenModal}
                >
                  Edit Profile
                </button>
              </div>

              <EditProfileModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveProfile}
                initialData={profileData}
              />
            </>
          )}
        </div>

        <ProfileTabs />
      </div>
    </div>
  );
}
