package com.example.deliverytogetherbackend.controller;

import com.example.deliverytogetherbackend.domain.Chat;
import com.example.deliverytogetherbackend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;


@RequiredArgsConstructor
@RestController
public class ChatController {
    private final ChatService ChatService;


    @CrossOrigin
    @PostMapping("/chat")
    public ResponseEntity<?> registerChat(@RequestBody Chat chat) throws Exception {
        return new ResponseEntity<>(ChatService.registerChat(chat), HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/chat")
    public ResponseEntity<?> getChatingList() throws Exception {
        return new ResponseEntity<>(ChatService.getChatingList(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/chats")
    public Flux<Chat> mfind() throws Exception {
        return ChatService.mFind().subscribeOn(Schedulers.boundedElastic());
    }


}
