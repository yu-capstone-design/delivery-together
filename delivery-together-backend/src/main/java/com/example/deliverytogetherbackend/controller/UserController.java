package com.example.deliverytogetherbackend.controller;

import com.example.deliverytogetherbackend.domain.User;
import com.example.deliverytogetherbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @CrossOrigin
    @PostMapping("/join")
    public ResponseEntity<?> joinUser(@RequestBody User user) throws Exception {
        return new ResponseEntity<>(userService.registerUser(user), HttpStatus.CREATED);
    }
}
