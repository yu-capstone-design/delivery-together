package com.example.deliverytogetherbackend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   // id

    private String title;   // 제목

    private String category;   // 카테고리

    private int money;   // 최대지불가격

    private String content;   // 내용

    private LocalDateTime createdAt;   // 작성 시간
}
