package com.ekasutram.backend.repository;

import com.ekasutram.backend.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    // Finds top 10 fastest players (ascending order of time)
    List<Score> findTop10ByOrderByTimeTakenMsAsc();
}