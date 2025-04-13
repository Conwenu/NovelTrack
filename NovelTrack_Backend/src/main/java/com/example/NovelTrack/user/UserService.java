package com.example.NovelTrack.user;

import com.example.NovelTrack.exception.ResourceNotFoundException;
import com.example.NovelTrack.review.Review;
import com.example.NovelTrack.review.ReviewService;
import com.example.NovelTrack.trackitem.TrackItemService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private TrackItemService trackItemService;
    private ReviewService reviewService;
    public List<UserDTO> getAllUsers()
    {
        List<User> users =  userRepository.findAll();
        return users.stream().map(UserMapper::mapToUserDTO).collect(Collectors.toList());
    }
    public UserDTO getUserById(Long id)
    {
        User temp = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist with the given id: " + id));
        return UserMapper.mapToUserDTO(temp);
    }

    public User getUserByEmail(String email)
    {
        User temp = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist with the given email: " + email));;
        return temp;
    }

    public User getUserByUserName(String username)
    {
        User temp = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist with the given email: " + username));;
        return temp;
    }

    public UserDTO createUser(UserDTO userDTO)
    {
        User user = UserMapper.mapToUser(userDTO);
        // need to change the password to the actual password.
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDTO(savedUser);
    }

    public UserDTO updateUser(Long userId, UserDTO userDTO)
    {
        User user =  userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User does not exist with the given id: " + userId)
        );

        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setDescription(userDTO.getDescription());

        User updatedUser = userRepository.save(user);

        return UserMapper.mapToUserDTO(updatedUser);
    }

    public void deleteUser(Long userId)
    {
        User user =  userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User does not exist with the given id: " + userId)
        );
        trackItemService.deleteAllTrackItemsForUser(userId);
        reviewService.deleteAllReviewsByUser(userId);

        userRepository.deleteById(userId);

    }


}
