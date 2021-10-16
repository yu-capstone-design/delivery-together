package com.example.deliverytogetherbackend.repository;

import com.example.deliverytogetherbackend.domain.Matching;
import com.example.deliverytogetherbackend.domain.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    public static final String COLLECTION_NAME = "users";


    public String insertUser(User user) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection(COLLECTION_NAME).document(user.getUsername());
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        if (documentSnapshot.exists()) {
            return "중복된 계정의 회원이 존재합니다.";
        } else {
            documentReference.set(user);
            return "회원가입에 성공하였습니다.";
        }
    }

    public User selectUserDetail(String username) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection(COLLECTION_NAME).document(username);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        User user = null;

        if (documentSnapshot.exists()) {
            user = documentSnapshot.toObject(User.class);
            return user;
        } else
            return null;
    }
}
