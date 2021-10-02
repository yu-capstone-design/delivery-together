package com.example.deliverytogetherbackend.service;

import com.example.deliverytogetherbackend.domain.Matching;

import java.util.List;

public interface MatchingService {

    public String registerMatching(Matching matching) throws Exception;

    public List<Matching> getMatchingList() throws Exception;

    public Matching getMatchingDetail(String username) throws Exception;

    public String deleteMatching(String username);
}
