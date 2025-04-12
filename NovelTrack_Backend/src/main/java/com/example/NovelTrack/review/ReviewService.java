package com.example.NovelTrack.review;

import com.example.NovelTrack.exception.InvalidPermissionsException;
import com.example.NovelTrack.exception.ResourceNotFoundException;
import com.example.NovelTrack.trackitem.TrackItem;
import com.example.NovelTrack.trackitem.TrackItemDTO;
import com.example.NovelTrack.user.User;
import com.example.NovelTrack.user.UserMapper;
import com.example.NovelTrack.user.UserRepository;
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
    private ReviewRepository reviewRepository;
    private UserRepository userRepository;
    public List<ReviewDTO> getAllReviews()
    {
        List<Review> reviews =  reviewRepository.findAll();
        return reviews.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ReviewDTO> getAllReviewsByUser(Long userId)
    {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        List<Review> reviews =  reviewRepository.findAllByUser(user);
        return reviews.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ReviewDTO> getAllReviewsForBook(String bookId)
    {
        List<Review> reviews =  reviewRepository.findAllByBookId(bookId);
        return reviews.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ReviewDTO getReview(Long id)
    {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with given id:" + id));
        return this.toDTO(review);
    }

    public List<ReviewDTO> getAllReviewsForBookByUser(Long userId, String bookId)
    {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        List<Review> reviews =  reviewRepository.findByUserAndBookId(user, bookId);
        return reviews.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ReviewDTO createReview(Long userId, ReviewRequest reviewRequest)
    {
        Review review = new Review();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        review.setUser(user);
        review.setBookId(reviewRequest.getBookId());
        review.setBookTitle(reviewRequest.getBookTitle());
        review.setBookImageUrl(reviewRequest.getBookImageUrl());
        review.setContent(reviewRequest.getContent());
        review.setLastChanged(LocalDateTime.now());
        return this.toDTO(reviewRepository.save(review));
    }

    private ReviewDTO toDTO(Review review)
    {
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setUser(UserMapper.mapToUserDTO(review.getUser()));
        reviewDTO.setId(review.getId());
        reviewDTO.setContent(review.getContent());
        reviewDTO.setBookImageUrl(review.getBookImageUrl());
        reviewDTO.setBookId(review.getBookId());
        reviewDTO.setBookTitle(reviewDTO.getBookTitle());
        reviewDTO.setLastChanged(review.getLastChanged());
        return reviewDTO;
    }

    public ReviewDTO editReview(Long userId, Long reviewId, ReviewRequest reviewRequest)
    {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        Review review = reviewRepository.findById(reviewId).
                orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + reviewId));
        if(!Objects.equals(review.getUser().getId(), userId))
        {
            throw new ResourceNotFoundException("Review not found with user id: " + userId + "and book id: " + reviewRequest.getBookId());
        }
        review.setContent(reviewRequest.getContent());
        review.setLastChanged(LocalDateTime.now());
        return this.toDTO(reviewRepository.save(review));
    }

    @Transactional
    public void deleteReview(Long id, Long userId)
    {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review does not exist with the given id: " + id));
        if(!Objects.equals(review.getUser().getId(), userId))
        {
            throw new InvalidPermissionsException("Review not found with user id: " + userId + "and book id: " + review.getBookId());
        }
        reviewRepository.delete(review);
    }

    @Transactional
    public void deleteAllReviewsByUser(Long userId)
    {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        reviewRepository.deleteByUser(user);  // Deleting by User
    }
}
