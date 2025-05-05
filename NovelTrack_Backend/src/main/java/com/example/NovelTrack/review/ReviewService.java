package com.example.NovelTrack.review;

import com.example.NovelTrack.exception.InvalidPermissionsException;
import com.example.NovelTrack.exception.ResourceNotFoundException;
import com.example.NovelTrack.user.User;
import com.example.NovelTrack.user.UserRepository;
import com.example.NovelTrack.user.UserMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public List<ReviewDTO> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return reviews.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ReviewDTO> getAllReviewsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        List<Review> reviews = reviewRepository.findAllByUser(user);
        return reviews.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ReviewDTO> getAllReviewsForBook(String bookId) {
        List<Review> reviews = reviewRepository.findAllByBookId(bookId);
        return reviews.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ReviewDTO getReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with given id:" + id));
        return this.toDTO(review);
    }

    public List<ReviewDTO> getAllReviewsForBookByUser(Long userId, String bookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        List<Review> reviews = reviewRepository.findByUserAndBookId(user, bookId);
        return reviews.stream().map(this::toDTO).collect(Collectors.toList());
    }

    // Create a default user if one doesn't exist
    public ReviewDTO createReview(ReviewRequest reviewRequest) {
        Review review = new Review();

        /*public ReviewDTO createReview(Long userId, ReviewRequest reviewRequest) {

        Review review = new Review();

        User user = userRepository.findById(userId)*/

        User user = userRepository.findById(reviewRequest.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + reviewRequest.getUserId()));

        review.setUser(user);
        review.setBookId(reviewRequest.getBookId());
        review.setBookTitle(reviewRequest.getBookTitle());
        review.setBookImageUrl(reviewRequest.getBookImageUrl());
        review.setContent(reviewRequest.getContent());
        review.setLastChanged(LocalDateTime.now());

        return this.toDTO(reviewRepository.save(review));
    }


    
    private User createDefaultUser() {
        User defaultUser = new User();
        defaultUser.setEmail("guest@example.com");
        defaultUser.setUsername("GuestUser");
        defaultUser.setPassword("guestpassword");  
        defaultUser.setDescription("Guest user with no specific description");

        return userRepository.save(defaultUser);
    }



    private ReviewDTO toDTO(Review review) {
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setUser(UserMapper.mapToUserDTO(review.getUser()));
        reviewDTO.setId(review.getId());
        reviewDTO.setContent(review.getContent());
        reviewDTO.setBookImageUrl(review.getBookImageUrl());
        reviewDTO.setBookId(review.getBookId());
        reviewDTO.setBookTitle(review.getBookTitle());
        reviewDTO.setLastChanged(review.getLastChanged());
        return reviewDTO;
    }

    public ReviewDTO editReview(Long userId, Long reviewId, ReviewRequest reviewRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + reviewId));

        if (!Objects.equals(review.getUser().getId(), userId)) {
            throw new InvalidPermissionsException("Review does not belong to user id: " + userId);
        }

        review.setContent(reviewRequest.getContent());
        review.setLastChanged(LocalDateTime.now());

        return this.toDTO(reviewRepository.save(review));
    }

    @Transactional
    public void deleteReview(Long id, Long userId) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review does not exist with the given id: " + id));

        if (!Objects.equals(review.getUser().getId(), userId)) {
            throw new InvalidPermissionsException("Review does not belong to user id: " + userId);
        }

        reviewRepository.delete(review);
    }

    @Transactional
    public void deleteAllReviewsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        reviewRepository.deleteByUser(user);  // Deleting by User
    }
}
