package com.example.NovelTrack.trackitem;

import com.example.NovelTrack.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface TrackItemRepository extends JpaRepository<TrackItem, Long> {
    Optional<TrackItem> findByUser(User user);
    List<TrackItem> findAllByUser(User user);

    Optional<TrackItem> findByUserAndBookId(User user, String bookId);

    List<TrackItem> findByUserAndRatingGreaterThanEqualOrderByRatingDesc(User user, Integer rating);

    @Query("SELECT t.bookTitle FROM TrackItem t WHERE t.user = :user AND t.rating >= 4 ORDER BY t.rating DESC")
    List<String> findLikedBookTitlesByUser(@Param("user") User user);

    @Transactional
    void deleteByUser(User user);


}
