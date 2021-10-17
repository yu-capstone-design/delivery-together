package com.example.deliverytogetherbackend.repository;

import com.example.deliverytogetherbackend.domain.Chat;
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

        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(chat.getSender()).set(chat);

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


}
