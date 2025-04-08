package com.example.NovelTrack.trackitem;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrackItemRequest {
    private Long userId;
    private String bookId;
    private String bookTitle;
    private String bookImageUrl;
    private TrackItem.Status status;
    private Integer rating;
}
