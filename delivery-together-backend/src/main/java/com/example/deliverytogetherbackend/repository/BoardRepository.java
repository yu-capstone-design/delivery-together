package com.example.deliverytogetherbackend.repository;

import com.example.deliverytogetherbackend.domain.Board;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;

import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class BoardRepository {

    public static final String COLLECTION_NAME = "boards";


    public String insertBoard(Board board) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<DocumentReference> apiFuture = firestore.collection(COLLECTION_NAME).add(board);

        return apiFuture.get().getId();
    }


    public List<Board> selectBoardList() throws Exception {
        List<Board> list = new ArrayList<>();

        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = apiFuture.get().getDocuments();

        for (QueryDocumentSnapshot document : documents)
            list.add(document.toObject(Board.class));

        return list;
    }
}
