import React, { useState } from "react";
import ProfileTabs from "./ProfileTabs";
import ProfileHeader from "./ProfileHeader";
import ProfileBio from "./ProfileBio";

export default function Profile() {
  return (
    <div className="min-h-screen bg-background w-full">
      <ProfileHeader />

      <div className="mt-20 px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between">
          <ProfileBio />

          <div className="mt-6 md:mt-0">
            {/* Add check to see if the user is logged in and if this is their profile. */}
            {/* Also add the implementation for the modal */}
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition">
              Edit Profile
            </button>
          </div>
        </div>

        <ProfileTabs />
      </div>
    </div>
  );
}
