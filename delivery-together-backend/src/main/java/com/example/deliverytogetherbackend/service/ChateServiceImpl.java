package com.example.deliverytogetherbackend.service;

import com.example.deliverytogetherbackend.domain.Chat;
import com.example.deliverytogetherbackend.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ChateServiceImpl implements ChatService {

    private final ChatRepository chatRepository;

    @Override
    public String registerMatching(Chat chat) throws Exception {
        return chatRepository.insertMatching(chat);
    }


}
