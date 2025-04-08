package com.example.NovelTrack.rating;

import com.example.NovelTrack.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ratings")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "book_id", nullable = false)
    private String bookId;

    @Column(name = "rating", nullable = false)
    private Integer rating; // goes from 1 to 5 as like a star rating.
}
