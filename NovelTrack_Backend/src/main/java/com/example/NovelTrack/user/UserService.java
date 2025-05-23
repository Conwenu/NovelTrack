package com.example.NovelTrack.user;

import com.example.NovelTrack.exception.ResourceNotFoundException;
import com.example.NovelTrack.review.Review;
import com.example.NovelTrack.review.ReviewService;
import com.example.NovelTrack.trackitem.TrackItem;
import com.example.NovelTrack.trackitem.TrackItemDTO;
import com.example.NovelTrack.trackitem.TrackItemService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.EnumMap;
import java.util.Map;
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

//    public HashMap<TrackItem.Status, Integer> getUserStats2(Long userId)
//    {
//        HashMap<TrackItem.Status, Integer> stats = new HashMap<>();
//        stats.put("READING", 0);
//        stats.put("COMPLETED", 0);
//        stats.put("PLANNING", 0);
//        User user =  userRepository.findById(userId).orElseThrow(
//                () -> new ResourceNotFoundException("User does not exist with the given id: " + userId)
//        );
//
//        Map<TrackItemDTO.Status, Integer> stats = new EnumMap<>(TrackItemDTO.Status.class);
//        for (TrackItemDTO.Status status : TrackItemDTO.Status.values()) {
//            stats.put(status, 0);
//        }
//
//        // Fetch all items and count statuses
//        List<TrackItemDTO> items = trackItemService.getByUserId(userId);
//        for (TrackItemDTO item : items) {
//            stats.put(item.getStatus(), stats.get(item.getStatus()) + 1);
//        }
//
//        return stats;
//    }

    public Map<TrackItem.Status, Integer> getUserStats(Long userId) {
        // Optional: validate user existence
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User does not exist with the given id: " + userId);
        }

        // Initialize counters with 0
        Map<TrackItem.Status, Integer> stats = new EnumMap<>(TrackItem.Status.class);
        for (TrackItem.Status status : TrackItem.Status.values()) {
            stats.put(status, 0);
        }

        // Fetch all items and count statuses
        List<TrackItemDTO> items = trackItemService.getByUserId(userId);
        for (TrackItemDTO item : items) {
            stats.put(item.getStatus(), stats.get(item.getStatus()) + 1);
        }

        return stats;
    }





    public User saveUser(User user) {
        return userRepository.save(user);
    }

//    public User findByUsername(String username) {
//        return userRepository.findByUsername(username);
//    }
//
//    public User findByEmail(String email) {
//        return userRepository.findByEmail(email);
//    }

    public User findByUsernameOrEmail(String usernameOrEmail) {
        return userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

//    public UserDTO convertToDTO(User user) {
//        UserDTO userDTO = new UserDTO();
//        userDTO.setId(user.getId());
//        userDTO.setUsername(user.getUsername());
//        userDTO.setEmail(user.getEmail());
//        userDTO.setDescription(user.getDescription());
//        return userDTO;
//    }


}
