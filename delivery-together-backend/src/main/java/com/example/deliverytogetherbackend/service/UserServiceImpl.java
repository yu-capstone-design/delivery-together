package com.example.deliverytogetherbackend.service;

import com.example.deliverytogetherbackend.domain.User;
import com.example.deliverytogetherbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;


    @Override
    public String registerUser(User user) throws Exception {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");

        return userRepository.insertUser(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = null;

        try {
            user = userRepository.selectUserDetail(username);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (user == null)
            throw new UsernameNotFoundException(username + " 사용자를 찾을 수 없습니다.");

        return user;
    }
}
