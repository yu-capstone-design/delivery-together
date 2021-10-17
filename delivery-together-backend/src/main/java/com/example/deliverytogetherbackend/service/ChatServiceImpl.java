package com.example.deliverytogetherbackend.service;

import com.example.deliverytogetherbackend.domain.Chat;
import com.example.deliverytogetherbackend.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.List;


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
}
