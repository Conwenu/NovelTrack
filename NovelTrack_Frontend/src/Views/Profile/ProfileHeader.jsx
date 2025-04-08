import React from 'react'

const ProfileHeader = () => {
  return (
    <div className="relative h-64 w-full">
        <img
          src="https://i.redd.it/0zroee6x5ft91.jpg"
          alt="Profile banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute -bottom-16 left-8 border-4 border-background rounded-full">
          <img
            src="https://contentful.harrypotter.com/usf1vwtuqyxm/3SQ3X2km8wkQIsQWa02yOY/8801d7055a3e99dae8e60f54bb4b1db8/HarryPotter_WB_F4_HarryPotterMidshot_Promo_080615_Port.jpg?q=75&fm=jpg&w=914"
            alt="Profile avatar"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
      </div>
  )
}

export default ProfileHeader