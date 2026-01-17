package com.ekasutram.backend.repository;

import com.ekasutram.backend.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {

    List<Resource> findBySubject(String subject);
}
