package com.example.expense_tracker.repository;

import com.example.expense_tracker.entity.User;
import com.example.expense_tracker.enums.EmailFrequency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    List<User> findByEmailFrequency(EmailFrequency emailFrequency);
}