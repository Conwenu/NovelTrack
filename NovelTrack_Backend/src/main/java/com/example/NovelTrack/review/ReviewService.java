package com.example.NovelTrack.review;

import com.example.NovelTrack.exception.InvalidPermissionsException;
import com.example.NovelTrack.exception.ResourceNotFoundException;
import com.example.NovelTrack.trackitem.TrackItem;
import com.example.NovelTrack.user.User;
import com.example.NovelTrack.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class ReviewService {
    private ReviewRepository reviewRepository;
    private UserRepository userRepository;
    public List<Review> getAllReviews()
    {
        return reviewRepository.findAll();
    }

    public List<Review> getAllReviewsByUser(Long userId)
    {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return reviewRepository.findAllByUser(user);
    }

    public List<Review> getAllReviewsForBook(String bookId)
    {
        return reviewRepository.findAllByBookId(bookId);
    }

    public Review getReview(Long id)
    {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with given id:" + id));
    }

    public List<Review> getAllReviewsForBookByUser(Long userId, String bookId)
    {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return reviewRepository.findByUserAndBookId(user, bookId);
    }

    public Review createReview(Long userId, ReviewRequest reviewRequest)
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
        return reviewRepository.save(review);
    }

    public Review editReview(Long userId, Long reviewId, ReviewRequest reviewRequest)
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
        return reviewRepository.save(review);
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
