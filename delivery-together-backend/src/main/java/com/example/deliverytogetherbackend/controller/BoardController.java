package com.example.deliverytogetherbackend.controller;

import com.example.deliverytogetherbackend.domain.Board;
import com.example.deliverytogetherbackend.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardService boardService;


    @CrossOrigin
    @PostMapping("/board")
    public ResponseEntity<?> registerBoard(@RequestBody Board board) throws Exception {
        return new ResponseEntity<>(boardService.registerBoard(board), HttpStatus.CREATED);
    }


    @CrossOrigin
    @GetMapping("/board")
    public ResponseEntity<?> getBoardList() throws Exception {
        return new ResponseEntity<>(boardService.getBoardList(), HttpStatus.OK);
    }
}
