package com.example.deliverytogetherbackend.domain;

import lombok.Data;

@Data
public class User {
    private String username;   // 사용자 계정

    private String password;   // 사용자 비밀번호

    private String role;   // 사용자 권한
}
