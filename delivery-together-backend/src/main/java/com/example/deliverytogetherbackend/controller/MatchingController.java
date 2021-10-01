package com.example.deliverytogetherbackend.controller;

import com.example.deliverytogetherbackend.domain.Matching;
import com.example.deliverytogetherbackend.service.MatchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class MatchingController {

    private final MatchingService matchingService;


    @CrossOrigin
    @PostMapping("/matching")
    public ResponseEntity<?> registerMatching(@RequestBody Matching matching) throws Exception {
        return new ResponseEntity<>(matchingService.registerMatching(matching), HttpStatus.CREATED);
    }


    @CrossOrigin
    @GetMapping("/matching")
    public ResponseEntity<?> getMatchingList() throws Exception {
        return new ResponseEntity<>(matchingService.getMatchingList(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/matching/{username}")
    public ResponseEntity<?> getMatchingDetail(@PathVariable String username) throws Exception {
        return new ResponseEntity<>(matchingService.getMatchingDetail(username), HttpStatus.OK);
    }
}
