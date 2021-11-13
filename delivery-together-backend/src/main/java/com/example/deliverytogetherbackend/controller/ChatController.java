package com.example.deliverytogetherbackend.controller;

import com.example.deliverytogetherbackend.domain.Chat;
import com.example.deliverytogetherbackend.domain.Matching;
import com.example.deliverytogetherbackend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;


@RequiredArgsConstructor
@RestController
@EnableAsync
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

    @CrossOrigin
    @GetMapping("/chat/{roomNum}")
    public ResponseEntity<?> getChatRoom(@PathVariable String roomNum) throws Exception {
        return new ResponseEntity<>(ChatService.getChatRoom(roomNum), HttpStatus.OK);
    }


    @CrossOrigin
    @PutMapping("/chat/{roomNum}")
    public ResponseEntity<?> updateChatRoomMsg(@PathVariable String roomNum, @RequestBody Chat chat) throws Exception {
        return new ResponseEntity<>(ChatService.updateChatRoomMsg(roomNum, chat), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/chat/chatList")
    public ResponseEntity<?> getChatRoomList()throws Exception{
        return new ResponseEntity<>(ChatService.getChatRoomList(),HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/chat/chatList/{userName}")
    public ResponseEntity<?> getDetailRoomList(@PathVariable String userName)throws Exception{
        return new ResponseEntity<>(ChatService.getDetailRoomList(userName),HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(value = "/chat/abc")
    public ResponseEntity<?> abc()throws Exception{
        return new ResponseEntity<>(ChatService.abc(),HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(value = "/chat/www")
    public ResponseEntity<?> www()throws Exception{
        return new ResponseEntity<>(ChatService.abc(),HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(value = "/chat/rrr")
    public ResponseEntity<?> rrr()throws Exception{
        return new ResponseEntity<>(ChatService.abc(),HttpStatus.OK);
    }

}
