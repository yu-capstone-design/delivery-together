package com.example.deliverytogetherbackend.service;

import com.example.deliverytogetherbackend.domain.User;
import com.example.deliverytogetherbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;


    @Override
    public String registerUser(User user) throws Exception {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");

        return userRepository.insertUser(user);
    }
}
