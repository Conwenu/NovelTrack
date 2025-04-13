package com.example.NovelTrack;

import com.example.NovelTrack.exception.InvalidPermissionsException;
import com.example.NovelTrack.exception.ResourceNotFoundException;
import com.example.NovelTrack.review.Review;
import com.example.NovelTrack.review.ReviewRepository;
import com.example.NovelTrack.review.ReviewService;
import com.example.NovelTrack.user.User;
import com.example.NovelTrack.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ReviewServiceUnitTests {

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ReviewService reviewService;

    private Review testReview;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        User testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setUsername("tester");

        testReview = new Review();
        testReview.setId(10L);
        testReview.setUser(testUser);
        testReview.setBookId("BOOK123");
        testReview.setContent("Great read!");
    }

    @Test
    void deleteReview_ShouldSucceed_WhenUserOwnsReview() {
        when(reviewRepository.findById(10L)).thenReturn(Optional.of(testReview));

        assertDoesNotThrow(() -> reviewService.deleteReview(10L, 1L));
        verify(reviewRepository).delete(testReview);
    }

    @Test
    void deleteReview_ShouldThrowPermissionError_WhenUserMismatch() {
        when(reviewRepository.findById(10L)).thenReturn(Optional.of(testReview));

        assertThrows(InvalidPermissionsException.class, () ->
                reviewService.deleteReview(10L, 99L));
    }

    @Test
    void deleteReview_ShouldThrowNotFound_WhenReviewMissing() {
        when(reviewRepository.findById(10L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () ->
                reviewService.deleteReview(10L, 1L));
    }
}

