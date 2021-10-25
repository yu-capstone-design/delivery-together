package com.example.deliverytogetherbackend.controller;

import com.example.deliverytogetherbackend.config.JwtTokenHelper;
import com.example.deliverytogetherbackend.domain.LoginRequest;
import com.example.deliverytogetherbackend.domain.LoginResponse;
import com.example.deliverytogetherbackend.domain.User;
import com.example.deliverytogetherbackend.domain.UserInfo;
import com.example.deliverytogetherbackend.service.UserService;
import com.example.deliverytogetherbackend.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenHelper jwtTokenHelper;

    private final UserServiceImpl userServiceImpl;


    @PostMapping("/join")
    public ResponseEntity<?> joinUser(@RequestBody User user) throws Exception {
        return new ResponseEntity<>(userServiceImpl.registerUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {
        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();

        String jwtToken = jwtTokenHelper.generateToken(user.getUsername());

        LoginResponse response = new LoginResponse();
        response.setToken(jwtToken);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/auth/userinfo")
    public ResponseEntity<?> getUserInfo(Principal user) {
        User userEntity = (User) userServiceImpl.loadUserByUsername(user.getName());

        UserInfo userInfo = new UserInfo();
        userInfo.setUsername(userEntity.getUsername());
        userInfo.setBirthdate(userEntity.getBirthdate());
        userInfo.setCountry(userEntity.getCountry());
        userInfo.setGender(userEntity.getGender());
        userInfo.setRole(userEntity.getAuthorities().toString());

        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUserDetail(@PathVariable String username) throws Exception {
        User userEntity = userServiceImpl.getUserDetail(username);

        UserInfo userInfo = new UserInfo();
        userInfo.setUsername(userEntity.getUsername());
        userInfo.setBirthdate(userEntity.getBirthdate());
        userInfo.setCountry(userEntity.getCountry());
        userInfo.setGender(userEntity.getGender());

        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }
}
