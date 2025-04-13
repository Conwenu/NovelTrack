package com.example.NovelTrack.trackitem;

import com.example.NovelTrack.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "track_item")
@Entity
public class TrackItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "book_id", nullable = false)
    private String bookId;

    @Column(name = "book_title", nullable = false)
    private String bookTitle;

    @Column(name = "book_image_url")
    private String bookImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    private Integer rating;

    @Column(name = "last_changed")
    private LocalDateTime lastChanged;

    public enum Status {
        READING, COMPLETED, PLANNING
    }

    @PrePersist
    public void prePersist() {
        lastChanged = LocalDateTime.now();
    }

}
