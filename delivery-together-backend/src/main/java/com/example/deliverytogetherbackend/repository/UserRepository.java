package com.example.deliverytogetherbackend.repository;

import com.example.deliverytogetherbackend.domain.Matching;
import com.example.deliverytogetherbackend.domain.Rating;
import com.example.deliverytogetherbackend.domain.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class UserRepository {

    public static final String USERS_COLLECTION_NAME = "users";

    public static final String RATINGS_COLLECTION_NAME = "ratings";


    public String insertUser(User user) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection(USERS_COLLECTION_NAME).document(user.getUsername());
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
        DocumentReference documentReference = firestore.collection(USERS_COLLECTION_NAME).document(username);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        User user = null;

        if (documentSnapshot.exists()) {
            user = documentSnapshot.toObject(User.class);
            return user;
        } else
            return null;
    }

    public String insertRating(String username, Rating rating) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection(RATINGS_COLLECTION_NAME).document(username);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        Map<String, Object> map = new HashMap<>();

        String convertedUsername = rating.getUsername().replace(".", ",");
        map.put(convertedUsername, rating.getRating());

        if (username.equals(rating.getUsername())) {
            return "본인을 평가할 수 없습니다.";
        }

        if (!documentSnapshot.exists()) {
            documentReference.set(map);
        } else {
            if (documentSnapshot.contains(convertedUsername)) {
                return "중복된 사용자를 평가할 수 없습니다.";
            }

            documentReference.update(map);
        }

        return "매너점수 평가가 완료되었습니다.";
    }

    public String selectRating(String username) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection(RATINGS_COLLECTION_NAME).document(username);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        if (!documentSnapshot.exists()) {
            return "0.0점";
        } else {
            Map<String, Object> map = documentSnapshot.getData();

            double rating = 0;

            for (String key : map.keySet()) {
                double value = (double) map.get(key);
                rating += value;
            }
            return String.format("%.1f", rating / map.size()) + "점";
        }
    }
}
