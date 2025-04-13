package com.example.NovelTrack;

import com.example.NovelTrack.exception.ResourceNotFoundException;
import com.example.NovelTrack.review.ReviewService;
import com.example.NovelTrack.trackitem.TrackItemService;
import com.example.NovelTrack.user.User;
import com.example.NovelTrack.user.UserDTO;
import com.example.NovelTrack.user.UserRepository;
import com.example.NovelTrack.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceUnitTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private TrackItemService trackItemService;

    @Mock
    private ReviewService reviewService;

    @InjectMocks
    private UserService userService;

    private User user;
    private UserDTO userDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setId(1L);
        user.setEmail("a@example.com");
        user.setUsername("alice");
        user.setDescription("desc");

        userDTO = new UserDTO();
        userDTO.setId(1L);
        userDTO.setEmail("a@example.com");
        userDTO.setUsername("alice");
        userDTO.setDescription("desc");
    }

    @Test
    void getAllUsers_ShouldReturnList() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(user));
        var result = userService.getAllUsers();
        assertEquals(1, result.size());
        verify(userRepository).findAll();
    }

    @Test
    void getUserById_ShouldReturnUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        var result = userService.getUserById(1L);
        assertEquals("alice", result.getUsername());
    }

    @Test
    void getUserById_ShouldThrowWhenMissing() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> userService.getUserById(1L));
    }

    @Test
    void createUser_ShouldSaveAndReturnDTO() {
        when(userRepository.save(any(User.class))).thenReturn(user);
        var result = userService.createUser(userDTO);
        assertEquals("alice", result.getUsername());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void updateUser_ShouldModifyAndReturnDTO() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);
        userDTO.setUsername("bob");
        var result = userService.updateUser(1L, userDTO);
        assertEquals("bob", result.getUsername());
        verify(userRepository).save(user);
    }

    @Test
    void updateUser_ShouldThrowWhenMissing() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> userService.updateUser(1L, userDTO));
    }

    @Test
    void deleteUser_ShouldCallDependenciesAndDelete() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        doNothing().when(trackItemService).deleteAllTrackItemsForUser(1L);
        doNothing().when(reviewService).deleteAllReviewsByUser(1L);
        doNothing().when(userRepository).deleteById(1L);

        assertDoesNotThrow(() -> userService.deleteUser(1L));
        verify(trackItemService).deleteAllTrackItemsForUser(1L);
        verify(reviewService).deleteAllReviewsByUser(1L);
        verify(userRepository).deleteById(1L);
    }

    @Test
    void deleteUser_ShouldThrowWhenMissing() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> userService.deleteUser(1L));
    }
}
