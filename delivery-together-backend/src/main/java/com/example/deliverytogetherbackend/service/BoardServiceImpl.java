package com.example.deliverytogetherbackend.service;

import com.example.deliverytogetherbackend.domain.Board;
import com.example.deliverytogetherbackend.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;


    @Override
    public String registerBoard(Board board) throws Exception {
        return boardRepository.insertBoard(board);
    }


    @Override
    public List<Board> getBoardList() throws Exception {
        return boardRepository.selectBoardList();
    }
}
