package com.example.NovelTrack.review;

import com.example.NovelTrack.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "book_id", nullable = false)
    private String bookId;

    @Column(name = "book_title", nullable = false)
    private String bookTitle;

    @Column(name = "book_image_url")
    private String bookImageUrl;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "last_changed")
    private LocalDateTime lastChanged;

    @PrePersist
    public void prePersist() {
        lastChanged = LocalDateTime.now();
    }

}
