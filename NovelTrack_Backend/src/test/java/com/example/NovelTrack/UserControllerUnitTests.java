package com.example.NovelTrack;

import com.example.NovelTrack.user.UserController;
import com.example.NovelTrack.user.UserDTO;
import com.example.NovelTrack.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserControllerUnitTests {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private UserDTO userDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userDTO = new UserDTO();
        userDTO.setId(1L);
        userDTO.setEmail("a@example.com");
        userDTO.setUsername("alice");
        userDTO.setDescription("desc");
    }

    @Test
    void getAllUsers_ShouldReturnList() {
        when(userService.getAllUsers()).thenReturn(Collections.singletonList(userDTO));
        ResponseEntity<List<UserDTO>> response = userController.getAllUsers();
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
    }

    @Test
    void getUserById_ShouldReturnUser() {
        when(userService.getUserById(1L)).thenReturn(userDTO);
        ResponseEntity<UserDTO> response = userController.getUser(1L);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("alice", response.getBody().getUsername());
    }

    @Test
    void createUser_ShouldReturnCreatedUser() {
        when(userService.createUser(userDTO)).thenReturn(userDTO);
        ResponseEntity<UserDTO> response = userController.createUser(userDTO);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("alice", response.getBody().getUsername());
    }

    @Test
    void updateUser_ShouldReturnUpdatedUser() {
        when(userService.updateUser(1L, userDTO)).thenReturn(userDTO);
        ResponseEntity<UserDTO> response = userController.updateUser(1L, userDTO);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("alice", response.getBody().getUsername());
    }

    @Test
    void deleteUser_ShouldReturnConfirmation() {
        doNothing().when(userService).deleteUser(1L);
        ResponseEntity<String> response = userController.deleteUser(1L);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("User Deleted Successfully", response.getBody());
    }
}
