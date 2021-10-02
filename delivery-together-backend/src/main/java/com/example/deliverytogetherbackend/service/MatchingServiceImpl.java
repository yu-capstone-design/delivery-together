package com.example.deliverytogetherbackend.service;

import com.example.deliverytogetherbackend.domain.Matching;
import com.example.deliverytogetherbackend.repository.MatchingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class MatchingServiceImpl implements MatchingService {

    private final MatchingRepository matchingRepository;


    @Override
    public String registerMatching(Matching matching) throws Exception {
        return matchingRepository.insertMatching(matching);
    }


    @Override
    public List<Matching> getMatchingList() throws Exception {
        return matchingRepository.selectMatchingList();
    }

    @Override
    public Matching getMatchingDetail(String username) throws Exception {
        return matchingRepository.selectMatchingDetail(username);
    }

    @Override
    public String deleteMatching(String username){
        return matchingRepository.deleteMatching(username);
    }
}
