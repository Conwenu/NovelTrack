package com.example.NovelTrack.trackitem;

import com.example.NovelTrack.exception.ResourceNotFoundException;
import com.example.NovelTrack.user.User;
import com.example.NovelTrack.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class TrackItemService {
    private TrackItemRepository trackItemRepository;
    private UserRepository userRepository;

    public List<TrackItem> getAllTrackItems()
    {
        return trackItemRepository.findAll();
    }

    public List<TrackItem> getByUserId(Long userId)
    {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return trackItemRepository.findAllByUser(user);
    }

    public TrackItem getSpecificTrackItem(Long userId, String bookId)
    {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return trackItemRepository.findByUserAndBookId(user, bookId)
                .orElseThrow(() -> new ResourceNotFoundException("TrackItem not found with given userId and bookId"));
    }

    public TrackItem createTrackItem(TrackItemRequest trackItemRequest) {
        User user = userRepository.findById(trackItemRequest.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + trackItemRequest.getUserId()));

        TrackItem trackItem = new TrackItem();
        trackItem.setUser(user);  // Setting the User reference
        trackItem.setBookId(trackItemRequest.getBookId());
        trackItem.setBookTitle(trackItemRequest.getBookTitle());
        trackItem.setBookImageUrl(trackItemRequest.getBookImageUrl());
        trackItem.setStatus(trackItemRequest.getStatus());
        trackItem.setRating(trackItemRequest.getRating());
        trackItem.setLastChanged(LocalDateTime.now());

        return trackItemRepository.save(trackItem);
    }

    public TrackItem editTrackItem(Long userId, TrackItemRequest trackItemRequest)
    {
        TrackItem trackItem = this.getSpecificTrackItem(userId, trackItemRequest.getBookId());
        trackItem.setStatus(trackItemRequest.getStatus());
        if (trackItemRequest.getRating() != null)
        {
            trackItem.setRating(trackItemRequest.getRating());
        }
        trackItem.setLastChanged(LocalDateTime.now());
        return trackItemRepository.save(trackItem);
    }

    public TrackItem rateBook(Long userId, TrackItemRequest trackItemRequest)
    {
        TrackItem trackItem = this.getSpecificTrackItem(userId, trackItemRequest.getBookId());
        if (trackItemRequest.getRating() != null)
        {
            trackItem.setRating(trackItemRequest.getRating());
        }
        trackItem.setLastChanged(LocalDateTime.now());
        return trackItemRepository.save(trackItem);
    }

    @Transactional
    public void deleteTrackItem(Long id)
    {
        TrackItem trackItem = trackItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TrackItem does not exist with the given id: " + id));
        trackItemRepository.delete(trackItem);
    }

    @Transactional
    public void deleteAllTrackItemsForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        trackItemRepository.deleteByUser(user);  // Deleting by User
    }


}
