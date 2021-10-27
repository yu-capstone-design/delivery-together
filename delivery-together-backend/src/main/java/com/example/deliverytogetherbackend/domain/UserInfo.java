package com.example.deliverytogetherbackend.domain;

import lombok.Data;

@Data
public class UserInfo {

    private String username;   // 사용자 이름

    private String birthdate;   // 사용자 생일

    private String country;   // 사용자 국적

    private String gender;   // 사용자 성별

    private String password;   // 사용자 비밀번호

    private String role;   // 사용자 권한

    private double ratings;   // 사용자 평점
}
