package com.example.deliverytogetherbackend.service;

import com.example.deliverytogetherbackend.domain.Board;

import java.util.List;

public interface BoardService {

    public String registerBoard(Board board) throws Exception;

    public List<Board> getBoardList() throws Exception;
}
