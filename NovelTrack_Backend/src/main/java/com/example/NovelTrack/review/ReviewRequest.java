package com.example.NovelTrack.review;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequest {
    private Long userId;
    private String bookId;
    private String bookTitle;
    private String bookImageUrl;
    private String content;
}
