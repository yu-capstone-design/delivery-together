package com.example.deliverytogetherbackend.controller;

import com.example.deliverytogetherbackend.domain.Matching;
import com.example.deliverytogetherbackend.service.MatchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
public class MatchingController {

    private final MatchingService matchingService;


    @PostMapping("/matching")
    public ResponseEntity<?> registerMatching(@RequestBody Matching matching) throws Exception {
        return new ResponseEntity<>(matchingService.registerMatching(matching), HttpStatus.CREATED);
    }


    @GetMapping("/matching")
    public ResponseEntity<?> getMatchingList() throws Exception {
        return new ResponseEntity<>(matchingService.getMatchingList(), HttpStatus.OK);
    }


    @GetMapping("/matching/{username}")
    public ResponseEntity<?> getMatchingDetail(@PathVariable String username) throws Exception {
        return new ResponseEntity<>(matchingService.getMatchingDetail(username), HttpStatus.OK);
    }


    @PutMapping("/matching/{username}")
    public ResponseEntity<?> updateMatching(@PathVariable String username, @RequestBody Matching matching) throws Exception {
        return new ResponseEntity<>(matchingService.updateMatching(username, matching), HttpStatus.OK);
    }

    @DeleteMapping("/matching/{username}")
    public ResponseEntity<?> deleteMatching(@PathVariable String username) {
        return new ResponseEntity<>(matchingService.deleteMatching(username), HttpStatus.OK);
    }
}
