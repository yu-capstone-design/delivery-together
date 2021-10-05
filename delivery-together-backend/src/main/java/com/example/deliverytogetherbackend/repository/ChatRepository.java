package com.example.deliverytogetherbackend.repository;

import com.example.deliverytogetherbackend.domain.Chat;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;

import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

public class ChatRepository {
    public static final String COLLECTION_NAME = "boards";


    public String insertMatching(Chat chat) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(chat.getId()).set(chat);

        return apiFuture.get().getUpdateTime().toString();
    }

}
