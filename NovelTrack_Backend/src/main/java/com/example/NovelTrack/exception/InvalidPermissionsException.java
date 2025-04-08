package com.example.NovelTrack.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class InvalidPermissionsException extends RuntimeException{
    public InvalidPermissionsException(String message)
    {
        super(message);
    }
}
