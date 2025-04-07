package com.example.NovelTrack.trackitem;

import com.example.NovelTrack.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface TrackItemRepository extends JpaRepository<TrackItem, Long> {
    Optional<TrackItem> findByUser(User user);
    List<TrackItem> findAllByUser(User user);

    Optional<TrackItem> findByUserAndBookId(User user, String bookId);

    @Transactional
    void deleteByUser(User user);

}
