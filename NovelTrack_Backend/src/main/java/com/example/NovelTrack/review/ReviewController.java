package com.example.NovelTrack.review;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/reviews")
public class ReviewController {
    private ReviewService reviewService;
    @GetMapping
    public ResponseEntity<List<ReviewDTO>> getAllReviews()
    {
        List<ReviewDTO> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("user/{id}")
    public  ResponseEntity<List<ReviewDTO>> getAllReviewsByUser(@PathVariable("id") Long userId)
    {
        List<ReviewDTO> reviews = reviewService.getAllReviewsByUser(userId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("book/{id}")
    public ResponseEntity<List<ReviewDTO>> getAllReviewsForBook(@PathVariable("id") String bookId)
    {
        List<ReviewDTO> reviews = reviewService.getAllReviewsForBook(bookId);
        return ResponseEntity.ok(reviews);
    }

    // implement get user reviews for specific book
    @GetMapping("/user/{userId}/book/{bookId}")
    public  ResponseEntity<List<ReviewDTO>> getAllReviewsForBookByUser(@PathVariable("userId") Long userId,
                                                 @PathVariable("bookId") String bookId)
    {
        List<ReviewDTO> reviews = reviewService.getAllReviewsForBookByUser(userId, bookId);
        return  ResponseEntity.ok(reviews);
    }

    @GetMapping("{id}")
    public ResponseEntity<ReviewDTO> getReview(@PathVariable("id") Long id)
    {
        ReviewDTO review = reviewService.getReview(id);
        return ResponseEntity.ok(review);
    }

    @PostMapping("{id}")
    public ResponseEntity<ReviewDTO> createReview(@PathVariable("id") Long userId, @RequestBody ReviewRequest reviewRequest)
    {
        ReviewDTO review = reviewService.createReview(userId, reviewRequest);
        return ResponseEntity.ok(review);
    }

    @PutMapping("/user/{userId}/review/{reviewId}")
    public  ResponseEntity<ReviewDTO> editReview(@PathVariable("userId") Long userId,
                                              @PathVariable("reviewId") Long reviewId,
                                              @RequestBody ReviewRequest reviewRequest)
    {
        ReviewDTO review = reviewService.editReview(userId, reviewId, reviewRequest);
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
