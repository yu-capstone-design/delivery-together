package com.example.deliverytogetherbackend.repository;

import com.example.deliverytogetherbackend.domain.Matching;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;

import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class MatchingRepository {

    public static final String COLLECTION_NAME = "matchings";


    public String insertMatching(Matching matching) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection(COLLECTION_NAME).document(matching.getUsername());
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        if (documentSnapshot.exists()) {
            return "이미 등록된 매칭이 존재합니다.";
        }else{
            documentReference.set(matching);
            return "매칭 등록에 성공하였습니다.";
        }
    }


    public List<Matching> selectMatchingList() throws Exception {
        List<Matching> list = new ArrayList<>();

        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = apiFuture.get().getDocuments();

        for (QueryDocumentSnapshot document : documents)
            list.add(document.toObject(Matching.class));

        return list;
    }


    public Matching selectMatchingDetail(String username) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection(COLLECTION_NAME).document(username);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        Matching matching = null;

        if (documentSnapshot.exists()) {
            matching = documentSnapshot.toObject(Matching.class);
            return matching;
        } else
            return null;
    }


    public String updateMatching(String username, Matching matching) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(username).set(matching);

        return apiFuture.get().getUpdateTime().toString();
    }


    public String deleteMatching(String username) {
        Firestore firestore = FirestoreClient.getFirestore();
        firestore.collection(COLLECTION_NAME).document(username).delete();

        return username + "님의 매칭이 삭제되었습니다.";
    }
}
