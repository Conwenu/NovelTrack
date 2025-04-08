package com.example.NovelTrack.review;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/review")
public class ReviewController {
    private ReviewService reviewService;
    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews()
    {
        List<Review> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("user/{id}")
    public  ResponseEntity<List<Review>> getAllReviewsByUser(@PathVariable("id") Long userId)
    {
        List<Review> reviews = reviewService.getAllReviewsByUser(userId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("book/{id}")
    public ResponseEntity<List<Review>> getAllReviewsForBook(@PathVariable("id") String bookId)
    {
        List<Review> reviews = reviewService.getAllReviewsForBook(bookId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("{id}")
    public ResponseEntity<Review> getReview(@PathVariable("id") Long id)
    {
        Review review = reviewService.getReview(id);
        return ResponseEntity.ok(review);
    }

    @PostMapping("{id}")
    public ResponseEntity<Review> createReview(@PathVariable("id") Long userId, @RequestBody ReviewRequest reviewRequest)
    {
        Review review = reviewService.createReview(userId, reviewRequest);
        return ResponseEntity.ok(review);
    }

    @PutMapping("/user/{userId}/review/{reviewId}")
    public  ResponseEntity<Review> editReview(@PathVariable("userId") Long userId,
                                              @PathVariable("reviewId") Long reviewId,
                                              @RequestBody ReviewRequest reviewRequest)
    {
        Review review = reviewService.editReview(userId, reviewId, reviewRequest);
        return  ResponseEntity.ok(review);
    }

    @DeleteMapping("/user/{userId}/review/{reviewId}")
    public  ResponseEntity<String> deleteReview(@PathVariable("userId") Long userId, @PathVariable("reviewId") Long reviewId)
    {
        reviewService.deleteReview(reviewId,userId);
        return ResponseEntity.ok("Successfully Deleted Review id: " + reviewId);
    }

    @DeleteMapping("/user/review/{userId}")
    public  ResponseEntity<String> deleteAllReviewsByUser(@PathVariable("userId") Long userId)
    {
        reviewService.deleteAllReviewsByUser(userId);
        return ResponseEntity.ok("Successfully Deleted All Reviews For User id: " + userId);
    }
}
