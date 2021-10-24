package com.example.deliverytogetherbackend.domain;

import com.google.api.client.json.Json;
import lombok.Data;

import java.util.ArrayList;


@Data
public class Chat {

    private String lastSender;
    private String lastText;
    private String lastSendTime;

    private ArrayList<Object> message;

}
