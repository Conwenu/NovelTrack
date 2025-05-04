package com.example.NovelTrack.auth;

import com.example.NovelTrack.user.User;
import com.example.NovelTrack.user.UserDTO;
import com.example.NovelTrack.user.UserMapper;
import com.example.NovelTrack.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest registrationRequest) {
        // Check if username already exists
        if (userService.existsByUsername(registrationRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Username is already taken!"));
        }

        // Check if email already exists
        if (userService.existsByEmail(registrationRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Email is already in use!"));
        }

        // Create new user
        User user = new User();
        user.setUsername(registrationRequest.getUsername());
        user.setEmail(registrationRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

        User savedUser = userService.saveUser(user);
        UserDTO userDTO = UserMapper.mapToUserDTO(savedUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        // Check if user exists by username or email
        User user = userService.findByUsernameOrEmail(loginRequest.getUsernameOrEmail());

        if (user == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Invalid username/email or password"));
        }

        // Check if password matches
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Invalid username/email or password"));
        }

        // Create authentication token (in a real app, you'd use JWT or session)
        AuthResponse authResponse = new AuthResponse(
                true,
                "User logged in successfully",
                UserMapper.mapToUserDTO(user)
        );

        return ResponseEntity.ok(authResponse);
    }
}