package com.example.deliverytogetherbackend.service;

import com.example.deliverytogetherbackend.domain.User;
import com.example.deliverytogetherbackend.domain.UserInfo;

public interface UserService {
    public String registerUser(User user) throws Exception;

    public User getUserDetail(String username) throws Exception;
}
