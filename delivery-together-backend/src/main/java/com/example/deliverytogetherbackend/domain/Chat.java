package com.example.deliverytogetherbackend.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;


@Data
public class Chat {
    @Id
    private String id;
    private String msg;
    private String sender;
    private Integer roomNum;

    private LocalDateTime createdAt;
}
