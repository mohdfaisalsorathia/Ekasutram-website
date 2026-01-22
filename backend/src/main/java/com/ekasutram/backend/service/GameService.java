package com.ekasutram.backend.service;

import com.ekasutram.backend.model.GameQuestion;
import com.ekasutram.backend.model.Score;
import com.ekasutram.backend.repository.GameQuestionRepository;
import com.ekasutram.backend.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameQuestionRepository questionRepository;

    @Autowired
    private ScoreRepository scoreRepository;

    // Admin Logic: Uploads a new question and resets the leaderboard
    @Transactional
    public void updateGame(GameQuestion newQuestion) {
        // 1. Remove the old question(s)
        questionRepository.deleteAll();
        // 2. Save the new one
        questionRepository.save(newQuestion);
        // 3. Clear the leaderboard for the new round
        scoreRepository.deleteAll();
    }

    // User Logic: Get current question
    public GameQuestion getCurrentQuestion() {
        List<GameQuestion> questions = questionRepository.findAll();
        return questions.isEmpty() ? null : questions.get(0);
    }

    // User Logic: Submit a score
    public void submitScore(Score score) {
        scoreRepository.save(score);
    }

    // User Logic: Get Top 10
    public List<Score> getTopScores() {
        return scoreRepository.findTop10ByOrderByTimeTakenMsAsc();
    }
}