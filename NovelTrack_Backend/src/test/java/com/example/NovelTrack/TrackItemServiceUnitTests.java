package com.example.NovelTrack;

import com.example.NovelTrack.exception.ResourceNotFoundException;
import com.example.NovelTrack.trackitem.*;
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

public class TrackItemServiceUnitTests {

    @Mock
    private TrackItemRepository trackItemRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TrackItemService trackItemService;

    private User testUser;
    private TrackItem testTrackItem;
    private TrackItemRequest request;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("user@example.com");

        testTrackItem = new TrackItem();
        testTrackItem.setId(5L);
        testTrackItem.setUser(testUser);
        testTrackItem.setBookId("BOOK123");
        testTrackItem.setStatus(TrackItem.Status.PLANNING);

        request = new TrackItemRequest();
        request.setBookId("BOOK123");
        request.setBookTitle("Sample Book");
        request.setStatus(TrackItem.Status.READING);
    }

    @Test
    void createTrackItem_ShouldUpdateIfAlreadyExists() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(trackItemRepository.findByUserAndBookId(testUser, "BOOK123"))
                .thenReturn(Optional.of(testTrackItem));
        when(trackItemRepository.existsById(5L)).thenReturn(true);

        TrackItemDTO dto = trackItemService.createTrackItem(1L, request);

        assertEquals("BOOK123", dto.getBookId());
        verify(trackItemRepository, never()).save(any());
    }

    @Test
    void createTrackItem_ShouldThrowIfUserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () ->
                trackItemService.createTrackItem(1L, request));
    }

    @Test
    void deleteTrackItem_ShouldThrowIfItemNotFound() {
        when(trackItemRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () ->
                trackItemService.deleteTrackItem(999L));
    }
}
