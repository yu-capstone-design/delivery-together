package com.example.deliverytogetherbackend.controller;

import com.example.deliverytogetherbackend.domain.Board;
import com.example.deliverytogetherbackend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardService boardService;

    @CrossOrigin
    @PostMapping("/board")
    public ResponseEntity<?> registerBoard(@RequestBody Board board){
        return new ResponseEntity<>(boardService.registerBoard(board),)
    }
}
