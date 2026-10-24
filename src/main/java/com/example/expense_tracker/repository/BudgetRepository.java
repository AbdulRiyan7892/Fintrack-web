package com.example.expense_tracker.repository;

import com.example.expense_tracker.entity.Budget;
import com.example.expense_tracker.entity.User;
import com.example.expense_tracker.enums.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget,Long>{

    List<Budget> findByUser(User user);

    Optional<Budget> findByUserAndCategoryAndMonthAndYear(
            User user,
            Category category,
            Integer month,
            Integer year
    );

}