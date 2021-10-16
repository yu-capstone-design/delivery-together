package com.example.deliverytogetherbackend.service;

import com.example.deliverytogetherbackend.domain.Chat;
import reactor.core.publisher.Flux;

import java.util.List;

public interface ChatService {

    public String registerChat(Chat chat) throws Exception;


    Flux<Chat> mFind() throws Exception;

    public List<Chat> getChatingList() throws Exception;


}
