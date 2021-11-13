package com.example.deliverytogetherbackend.domain;

import com.google.api.client.json.Json;
import lombok.Data;

import java.util.ArrayList;


@Data
public class Chat {

    private String lastSender;
    private String lastText;
    private String lastSendTime;
    private Boolean matchingUserCheck;
    private Boolean chatUserCheck;

    private ArrayList<Object> message;

}
