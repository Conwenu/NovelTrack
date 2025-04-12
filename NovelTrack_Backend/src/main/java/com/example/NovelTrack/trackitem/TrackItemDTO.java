package com.example.NovelTrack.trackitem;

import com.example.NovelTrack.user.UserDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TrackItemDTO {
    private Long id;

    private UserDTO user;

    private String bookId;

    private String bookTitle;

    private String bookImageUrl;

    private TrackItem.Status status;

    private Integer rating;

    private LocalDateTime lastChanged;

    public enum Status {
        READING, COMPLETED, PLANNING
    }
}



