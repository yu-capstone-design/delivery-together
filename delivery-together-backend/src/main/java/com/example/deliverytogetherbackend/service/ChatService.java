package com.example.deliverytogetherbackend.service;

import com.example.deliverytogetherbackend.domain.Chat;
import com.example.deliverytogetherbackend.domain.ChatList;
import com.example.deliverytogetherbackend.domain.Matching;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import reactor.core.publisher.Flux;

import java.util.List;

public interface ChatService {

    public String registerChat(Chat chat) throws Exception;


    Flux<Chat> mFind() throws Exception;

    public List<Chat> getChatingList() throws Exception;

    public Chat getChatRoom(String roomNum) throws Exception;

    public String updateChatRoomMsg(String roomNum, Chat chat) throws Exception;

    public List<String> getChatRoomList() throws Exception;

    public List<ChatList> getDetailRoomList(String username) throws Exception;
}
