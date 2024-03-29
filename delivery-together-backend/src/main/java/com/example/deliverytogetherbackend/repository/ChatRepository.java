package com.example.deliverytogetherbackend.repository;

import com.example.deliverytogetherbackend.domain.Chat;
import com.example.deliverytogetherbackend.domain.ChatList;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;

import com.google.firebase.cloud.FirestoreClient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import javax.annotation.Nullable;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

@Repository
@Service
public class ChatRepository {
    public static final String COLLECTION_NAME = "chats";
    private List<String> abcList;
    private Boolean isTrue = false;

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

    //userName 이 포함된 정보만 return해준다
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
                    documentChat.setIsMatching(true);
                }else{
                    documentChat.setMatchingName(documentId.substring(0,documentUserIndex));
                    documentChat.setIsMatching(false);
                }
                documentChat.setChat(document.toObject(Chat.class));
                documentChat.setRoomId(documentId);
                chatList.add(documentChat);
            }
        }
        return chatList;
    }


//        public Future<List<Chat>> abc() throws Exception{
//        final Chat[] chat = {null};
//        final String[] aaa = {""};
//        abcList = new ArrayList<>();
//
//
//        Firestore firestore = FirestoreClient.getFirestore();
//        DocumentReference docRef = firestore.collection("chats").document("ejrwnd@naver.comejrwnd2@naver.com");
//        docRef.addSnapshotListener(new EventListener<DocumentSnapshot>() {
//            @Override
//            public void onEvent(@Nullable DocumentSnapshot snapshot,
//                                @Nullable FirestoreException e) {
//                if (e != null) {
//                    System.err.println("Listen failed: " + e);
//                }
//
//                if (snapshot != null && snapshot.exists()) {
//                    chat[0] = snapshot.toObject(Chat.class);
//                    abcList.add(snapshot.toObject(Chat.class));
//                    aaa[0] ="ddd";
//                    System.out.println(abcList);
//                } else {
//                    System.out.print("Current data: null");
//                }
//            }
//
//        }
//        );
//        return new AsyncResult<List<Chat>>(abcList);
//    }

    public Flux<String> www() throws Exception {

        List<String> chatList = new ArrayList<>();

        String a ="";
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection("chats").document("ejrwnd@naver.comejrwnd2@naver.com");
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        String chat = null;
        String chat2 = null;
        List<Object> list = new ArrayList<>();
        if (documentSnapshot.exists()) {
            chat = documentSnapshot.toObject(Chat.class).getLastText();
            return Flux.just(chat);
        } else
            return Flux.just(chat2);

    }

    @Async
    public List<String> getChatDataRealTime() throws Exception{
        abcList = new ArrayList<>();
        ArrayList<String> b =new ArrayList<String>();
        CompletableFuture<String> futurePrice = new CompletableFuture<>();

        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference docRef = firestore.collection("chats").document("ejrwnd@naver.comejrwnd2@naver.com");
        docRef.addSnapshotListener(new EventListener<DocumentSnapshot>() {
            @Override
            public void onEvent(@Nullable DocumentSnapshot snapshot,
                                @Nullable FirestoreException e) {
                if (e != null) {
                    System.err.println("Listen failed: " + e);
                }

                if (snapshot != null && snapshot.exists()) {
                    abcList.add(snapshot.toObject(Chat.class).getLastText());
                    isTrue = true;
                    System.out.println(snapshot.toObject(Chat.class).getLastText());
                } else {
                    System.out.print("Current data: null");
                }
            }
        }
        );
        docRef.addSnapshotListener(new EventListener<DocumentSnapshot>() {
            @Override
            public void onEvent(@Nullable DocumentSnapshot value, @Nullable FirestoreException error) {

            }
        });
        return abcList;
    }
}
