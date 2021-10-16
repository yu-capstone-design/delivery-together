package com.example.deliverytogetherbackend.domain;

import com.google.api.client.json.Json;
import lombok.Data;

import java.util.ArrayList;


@Data
public class Chat {

    private String msg;
    private String sender;
    private Integer roomNum;

    private String createdAt;

    private ArrayList<Object> example;

}
