package com.example.deliverytogetherbackend.domain;

import lombok.Data;


@Data
public class Board {

    private String title;   // 제목

    private String category;   // 카테고리

    private int money;   // 최대지불가격

    private String content;   // 내용

    private double latitude;   // 위도

    private double longitude;   // 경도

    private String createdAt;   // 작성 시간
}
