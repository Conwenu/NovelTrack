package com.example.NovelTrack.trackitem;

import com.example.NovelTrack.exception.ResourceNotFoundException;
import com.example.NovelTrack.user.User;
import com.example.NovelTrack.user.UserDTO;
import com.example.NovelTrack.user.UserMapper;
import com.example.NovelTrack.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TrackItemService {
    private TrackItemRepository trackItemRepository;
    private UserRepository userRepository;

    public List<TrackItemDTO> getAllTrackItems()
    {
        List<TrackItem> trackItems =  trackItemRepository.findAll();
        return trackItems.stream().map(this::toDTO).collect(Collectors.toList());

    }

    public List<TrackItemDTO> getByUserId(Long userId)
    {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        List<TrackItem> trackItems =  trackItemRepository.findAllByUser(user);
        return trackItems.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public TrackItemDTO getSpecificTrackItemDTO(Long userId, String bookId)
    {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        TrackItem trackItem =  trackItemRepository.findByUserAndBookId(user, bookId)
                .orElseThrow(() -> new ResourceNotFoundException("TrackItem not found with given userId and bookId"));
        return this.toDTO(trackItem);
    }

    public TrackItem getSpecificTrackItem(Long userId, String bookId)
    {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return trackItemRepository.findByUserAndBookId(user, bookId)
                .orElseThrow(() -> new ResourceNotFoundException("TrackItem not found with given userId and bookId"));
    }

    public TrackItemDTO createTrackItem(Long userId, TrackItemRequest trackItemRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        TrackItem existingTrackItem = getSpecificTrackItem(userId, trackItemRequest.getBookId());

        /*Optional<TrackItem> existing = trackItemRepository.findByUserAndBookId(user, trackItemRequest.getBookId());

        if (existing.isPresent()) {*/

        if (existingTrackItem != null && trackItemRepository.existsById(existingTrackItem.getId())) {
            return this.editTrackItem(userId, trackItemRequest);
        }

        TrackItem trackItem = new TrackItem();
        trackItem.setUser(user);
        trackItem.setBookId(trackItemRequest.getBookId());
        trackItem.setBookTitle(trackItemRequest.getBookTitle());
        trackItem.setBookImageUrl(trackItemRequest.getBookImageUrl());
        trackItem.setStatus(trackItemRequest.getStatus());
        trackItem.setRating(trackItemRequest.getRating());
        trackItem.setLastChanged(LocalDateTime.now());

        return this.toDTO(trackItemRepository.save(trackItem));
    }


    private TrackItemDTO toDTO(TrackItem trackItem) {
        TrackItemDTO trackItemDTO = new TrackItemDTO();
        trackItemDTO.setUser(UserMapper.mapToUserDTO(trackItem.getUser()));
        trackItemDTO.setBookId(trackItem.getBookId());
        trackItemDTO.setBookTitle(trackItem.getBookTitle());
        trackItemDTO.setBookImageUrl(trackItem.getBookImageUrl());
        trackItemDTO.setStatus(trackItem.getStatus());
        trackItemDTO.setRating(trackItem.getRating());
        trackItemDTO.setLastChanged(trackItem.getLastChanged());
        trackItemDTO.setId(trackItem.getId());
        return trackItemDTO;
    }

    public TrackItemDTO editTrackItem(Long userId, TrackItemRequest trackItemRequest)
    {
        TrackItem trackItem = this.getSpecificTrackItem(userId, trackItemRequest.getBookId());
        trackItem.setStatus(trackItemRequest.getStatus());
        if (trackItemRequest.getRating() != null)
        {
            trackItem.setRating(trackItemRequest.getRating());
        }
        trackItem.setLastChanged(LocalDateTime.now());
        return this.toDTO(trackItem);
    }

    public TrackItemDTO rateBook(Long userId, TrackItemRequest trackItemRequest)
    {
        TrackItem trackItem = this.getSpecificTrackItem(userId, trackItemRequest.getBookId());
        if (trackItemRequest.getRating() != null)
        {
            trackItem.setRating(trackItemRequest.getRating());
        }
        trackItem.setLastChanged(LocalDateTime.now());
        return this.toDTO(trackItemRepository.save(trackItem));
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

    public List<TrackItemDTO> getLikedBooks(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        List<TrackItem> likedItems = trackItemRepository
                .findByUserAndRatingGreaterThanEqualOrderByRatingDesc(user, 4);

        return likedItems.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<String> getLikedBookTitles(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return trackItemRepository.findLikedBookTitlesByUser(user);
    }


}
