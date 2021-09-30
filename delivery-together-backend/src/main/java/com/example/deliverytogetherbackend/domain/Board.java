package com.example.deliverytogetherbackend.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Board {

   // private String id;   // id

    private String title;   // 제목

    private String category;   // 카테고리

    private int money;   // 최대지불가격

    private String content;   // 내용

    private LocalDateTime createdAt;   // 작성 시간
}
