package com.example.NovelTrack.user;

import com.example.NovelTrack.user.User;
import com.example.NovelTrack.user.UserDTO;

public class UserMapper {
    public static UserDTO mapToUserDTO(User user)
    {
        return new UserDTO(
                user.getId(), user.getEmail(), user.getUsername(), user.getDescription()
        );
    }

    public static User mapToUser(UserDTO userDTO) {
        // I may need to add logic for getting the password, either by passing it externally as an argument
        // or obtaining it within here
        return new User(userDTO.getId(), userDTO.getEmail(), userDTO.getUsername(), "password", userDTO.getDescription());

    }
}