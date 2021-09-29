package com.example.deliverytogetherbackend.repository;

import com.example.deliverytogetherbackend.domain.Board;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;

import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

@Repository
public class BoardRepository {

    public static final String COLLECTION_NAME = "boards";

    public String insertBoard(Board board) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(board.getId().toString()).set(board);

        return apiFuture.get().getUpdateTime().toString();
    }
}
