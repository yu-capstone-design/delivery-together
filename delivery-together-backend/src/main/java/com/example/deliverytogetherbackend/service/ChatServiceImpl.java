package com.example.deliverytogetherbackend.service;

import com.example.deliverytogetherbackend.domain.Chat;
import com.example.deliverytogetherbackend.domain.ChatList;
import com.example.deliverytogetherbackend.repository.ChatRepository;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.concurrent.Future;


@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;

    @Override
    public String registerChat(Chat chat) throws Exception {
        return chatRepository.insertChat(chat);
    }

    @Override
    public Flux<Chat> mFind() throws Exception {
        return null;
    }


    @Override
    public List<Chat> getChatingList() throws Exception {
        return chatRepository.selectChatList();
    }

    @Override
    public Chat getChatRoom(String roomNum) throws Exception {
        return chatRepository.selectChatRoomData(roomNum);
    }

    @Override
    public String updateChatRoomMsg(String roomNum, Chat chat) throws Exception {
        return chatRepository.putChatRoomData(roomNum, chat);
    }

    @Override
    public List<String> getChatRoomList() throws Exception {
        return chatRepository.getChatRoomList();
    }

    @Override
    public List<ChatList> getDetailRoomList(String username) throws Exception {
        return chatRepository.getDetailRoomList(username);
    }

    @Override
    public List<String> abc() throws Exception {
        return chatRepository.getChatDataRealTime();
    }
}
