package com.example.NovelTrack.review;

import com.example.NovelTrack.trackitem.TrackItem;
import com.example.NovelTrack.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByUser(User user);

    List<Review> findAllByBookId(String bookId);

    List<Review> findByUserAndBookId(User user, String bookId);

    @Transactional
    void deleteByUser(User user);
}
