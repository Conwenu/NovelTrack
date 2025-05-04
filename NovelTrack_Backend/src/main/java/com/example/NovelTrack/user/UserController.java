package com.example.NovelTrack.user;

import com.example.NovelTrack.trackitem.TrackItem;
import com.example.NovelTrack.trackitem.TrackItemDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/users")
@AllArgsConstructor
public class UserController {
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers()
    {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @GetMapping("{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") Long id)
    {
        UserDTO userDTO =  userService.getUserById(id);
        return ResponseEntity.ok(userDTO);

    }

    @GetMapping("/{id}/stats")
    public Map<TrackItem.Status, Integer> getUserStats(@PathVariable("id") Long id)
    {
        Map<TrackItem.Status, Integer> stats = userService.getUserStats(id);
        return ResponseEntity.ok(stats).getBody();
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO)
    {
        UserDTO savedUser =  userService.createUser(userDTO);
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable("id") Long id, @RequestBody UserDTO userDTO)
    {
        UserDTO updatedUserDTO =  userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUserDTO);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id)
    {
        userService.deleteUser(id);
        return ResponseEntity.ok("User Deleted Successfully");

    }

}
