package com.example.deliverytogetherbackend.repository;

import com.example.deliverytogetherbackend.domain.Chat;
import com.example.deliverytogetherbackend.domain.ChatList;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;

import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ChatRepository {
    public static final String COLLECTION_NAME = "chats";


    public String insertChat(Chat chat) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        List<Chat> list = new ArrayList<>();
        list.add(chat);

        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(chat.getLastSender()).set(chat);

        return apiFuture.get().getUpdateTime().toString();
    }

    public List<Chat> selectChatList() throws Exception {
        List<Chat> list = new ArrayList<>();

        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = apiFuture.get().getDocuments();
        for (QueryDocumentSnapshot document : documents)
            list.add(document.toObject(Chat.class));

        return list;
    }


    public Chat selectChatRoomData(String roomNum) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection(COLLECTION_NAME).document(roomNum);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        Chat chat = null;
        Chat chat2 = new Chat();
        List<Object> list = new ArrayList<>();
        chat2.setMessage((ArrayList<Object>) list);
        chat2.setLastSender(null);
        chat2.setLastSendTime(null);
        chat2.setLastText(null);
        if (documentSnapshot.exists()) {
            chat = documentSnapshot.toObject(Chat.class);
            return chat;
        } else
            return chat2;
    }


    public String putChatRoomData(String roomNum, Chat chat) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(roomNum).set(chat);

        return apiFuture.get().getUpdateTime().toString();
    }

    public List<String> getChatRoomList() throws Exception {

        List<String> chatList = new ArrayList<>();

        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = apiFuture.get().getDocuments();

        for (QueryDocumentSnapshot document : documents)
            chatList.add(document.getId());
        return chatList;
    }

    public List<ChatList> getDetailRoomList(String userName) throws Exception {

        List<ChatList> chatList = new ArrayList<>();

        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = apiFuture.get().getDocuments();

        for (QueryDocumentSnapshot document : documents) {
            String documentId = document.getId();
            if (documentId.contains(userName)) {
                ChatList documentChat = new ChatList();
                int documentUserIndex = documentId.indexOf(userName);
                if(documentUserIndex == 0){
                    documentChat.setMatchingName(documentId.substring(userName.length()));
                }else{
                    documentChat.setMatchingName(documentId.substring(0,documentUserIndex));
                }
                documentChat.setChat(document.toObject(Chat.class));
                documentChat.setRoomId(documentId);
                chatList.add(documentChat);
            }
        }
        return chatList;
    }
}
