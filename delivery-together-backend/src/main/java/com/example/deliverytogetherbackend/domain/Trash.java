package com.example.deliverytogetherbackend.domain;
import com.example.deliverytogetherbackend.domain.Chat;

import lombok.Data;

import java.util.ArrayList;


@Data
public class Trash {

    private String roomId;
    private String matchingName;
    private Boolean isMatching;
    private Chat chat;

}
