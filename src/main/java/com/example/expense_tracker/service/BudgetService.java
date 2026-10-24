package com.example.expense_tracker.service;

import com.example.expense_tracker.dto.request.BudgetRequest;
import com.example.expense_tracker.dto.response.BudgetResponse;

import java.util.List;

public interface BudgetService {

    BudgetResponse createBudget(BudgetRequest request);

    List<BudgetResponse> getBudgets();

    BudgetResponse updateBudget(Long id,
                                BudgetRequest request);

    void deleteBudget(Long id);

}