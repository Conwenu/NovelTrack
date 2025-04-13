package com.example.NovelTrack;

import com.example.NovelTrack.trackitem.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TrackItemControllerUnitTests {

    @Mock
    private TrackItemService trackItemService;

    @InjectMocks
    private TrackItemController trackItemController;

    private TrackItemDTO dto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        dto = new TrackItemDTO();
        dto.setId(1L);
        dto.setBookId("BOOK123");
        dto.setBookTitle("Title");
    }

    @Test
    void getAllTrackItems_ShouldReturnList() {
        when(trackItemService.getAllTrackItems()).thenReturn(Collections.singletonList(dto));
        ResponseEntity<List<TrackItemDTO>> response = trackItemController.getAllTrackItems();
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
    }

    @Test
    void getByUserId_ShouldReturnList() {
        when(trackItemService.getByUserId(1L)).thenReturn(Collections.singletonList(dto));
        ResponseEntity<List<TrackItemDTO>> response = trackItemController.getTrackItemById(1L);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("BOOK123", response.getBody().get(0).getBookId());
    }

    @Test
    void getSpecificTrackItem_ShouldReturnDTO() {
        when(trackItemService.getSpecificTrackItemDTO(1L, "BOOK123")).thenReturn(dto);
        ResponseEntity<TrackItemDTO> response = trackItemController.getSpecificTrackItem(1L, "BOOK123");
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("BOOK123", response.getBody().getBookId());
    }

    @Test
    void createTrackItem_ShouldReturnDTO() {
        TrackItemRequest req = new TrackItemRequest();
        req.setBookId("BOOK123");
        req.setBookTitle("Title");
        req.setStatus(TrackItem.Status.PLANNING);
        when(trackItemService.createTrackItem(1L, req)).thenReturn(dto);

        ResponseEntity<TrackItemDTO> response = trackItemController.createTrackItem(1L, req);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("BOOK123", response.getBody().getBookId());
    }

    @Test
    void editTrackItem_ShouldReturnDTO() {
        TrackItemRequest req = new TrackItemRequest();
        req.setBookId("BOOK123");
        req.setStatus(TrackItem.Status.COMPLETED);
        when(trackItemService.editTrackItem(1L, req)).thenReturn(dto);

        ResponseEntity<TrackItemDTO> response = trackItemController.editTrackItem(1L, "BOOK123", req);
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void rateBook_ShouldReturnDTO() {
        TrackItemRequest req = new TrackItemRequest();
        req.setBookId("BOOK123");
        req.setRating(4);
        when(trackItemService.rateBook(1L, req)).thenReturn(dto);

        ResponseEntity<TrackItemDTO> response = trackItemController.rateBook(1L, "BOOK123", req);
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void deleteTrackItem_ShouldReturnConfirmation() {
        doNothing().when(trackItemService).deleteTrackItem(1L);
        ResponseEntity<String> response = trackItemController.deleteTrackItem(1L);
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody().contains("Deleted Track Item with ID: 1"));
    }

    @Test
    void deleteAllForUser_ShouldReturnConfirmation() {
        doNothing().when(trackItemService).deleteAllTrackItemsForUser(1L);
        ResponseEntity<String> response = trackItemController.deleteAllTrackItemsForUser(1L);
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody().contains("Deleted All Track Items for User with ID: 1"));
    }
}