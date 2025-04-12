package com.example.NovelTrack.review;

import com.example.NovelTrack.user.User;
import com.example.NovelTrack.user.UserDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReviewDTO {
    private Long id;
    private UserDTO user;

    private String bookId;

    private String bookTitle;

    private String bookImageUrl;

    private String content;

    private LocalDateTime lastChanged;

}
