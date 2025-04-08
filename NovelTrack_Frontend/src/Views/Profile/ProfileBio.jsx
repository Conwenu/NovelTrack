import React from "react";
import { Calendar, MapPin } from "lucide-react";
const ProfileBio = () => {
  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold text-foreground">BookReader99</h1>
      <div className="flex items-center space-x-4 mt-2 text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Joined Jan 2025</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          <span>USA</span>
        </div>
      </div>

      <div className="mt-4 text-foreground">
        <p>
          Book enthusiast and collector. I love exploring new worlds through
          literature!
        </p>
      </div>
    </div>
  );
};

export default ProfileBio;
