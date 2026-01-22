package com.ekasutram.backend.repository;

import com.ekasutram.backend.model.GameQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameQuestionRepository extends JpaRepository<GameQuestion, Long> {
}