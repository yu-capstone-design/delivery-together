package com.example.deliverytogetherbackend.domain;
import com.example.deliverytogetherbackend.domain.Chat;

import lombok.Data;

import java.util.ArrayList;


@Data
public class ChatList {

    private String roomId;
    private String matchingName;
    private Chat chat;

}
