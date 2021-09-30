package com.example.deliverytogetherbackend.service;

import com.example.deliverytogetherbackend.domain.Board;
import com.example.deliverytogetherbackend.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;


    @Override
    public String registerBoard(Board board) throws Exception {
        LocalDateTime now=LocalDateTime.now();
        board.setCreatedAt(now);

        return boardRepository.insertBoard(board);
    }
}
