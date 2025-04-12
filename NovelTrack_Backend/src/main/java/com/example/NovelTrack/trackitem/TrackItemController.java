package com.example.NovelTrack.trackitem;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/track-item")
public class TrackItemController {
    private TrackItemService trackItemService;

    @GetMapping
    public ResponseEntity<List<TrackItemDTO>> getAllTrackItems()
    {
        List<TrackItemDTO> trackItems = trackItemService.getAllTrackItems();
        return ResponseEntity.ok(trackItems);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<TrackItemDTO>> getTrackItemById(@PathVariable("id") Long userId)
    {
        List<TrackItemDTO> trackItems = trackItemService.getByUserId(userId);
        return ResponseEntity.ok(trackItems);
    }

    @GetMapping("/user/{userId}/book/{bookId}")
    public ResponseEntity<TrackItemDTO> getSpecificTrackItem(@PathVariable("userId") Long userId,
                                                          @PathVariable("bookId") String bookId) {
        TrackItemDTO trackItem = trackItemService.getSpecificTrackItemDTO(userId, bookId);
        System.out.println(trackItem);
        return ResponseEntity.ok(trackItem);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<TrackItemDTO> createTrackItem(@PathVariable("userId") Long userId,
                                                     @RequestBody TrackItemRequest trackItemRequest) {
//        trackItemRequest.setUserId(userId);
        TrackItemDTO trackItem = trackItemService.createTrackItem(userId, trackItemRequest);
        return ResponseEntity.ok(trackItem);
    }

    @PutMapping("/user/{userId}/book/{bookId}")
    public ResponseEntity<TrackItemDTO> editTrackItem(@PathVariable("userId") Long userId,
                                                   @PathVariable("bookId") String bookId,
                                                   @RequestBody TrackItemRequest trackItemRequest) {
//        trackItemRequest.setUserId(userId);
        TrackItemDTO trackItem = trackItemService.editTrackItem(userId, trackItemRequest);
        return ResponseEntity.ok(trackItem);
    }

    @PutMapping("/user/{userId}/book/{bookId}/rate")
    public ResponseEntity<TrackItemDTO> rateBook(@PathVariable("userId") Long userId,
                                              @PathVariable("bookId") String bookId,
                                              @RequestBody TrackItemRequest trackItemRequest) {
        trackItemRequest.setUserId(userId);
        TrackItemDTO trackItem = trackItemService.rateBook(userId, trackItemRequest);
        return ResponseEntity.ok(trackItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTrackItem(@PathVariable("id") Long id) {
        trackItemService.deleteTrackItem(id);
        return ResponseEntity.ok("Deleted Track Item with ID: " + id);
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<String> deleteAllTrackItemsForUser(@PathVariable("userId") Long userId) {
        trackItemService.deleteAllTrackItemsForUser(userId);
        return ResponseEntity.ok("Deleted All Track Items for User with ID: " + userId);
    }


}
