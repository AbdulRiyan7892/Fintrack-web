package com.example.expense_tracker.controller;

import com.example.expense_tracker.dto.request.BudgetRequest;
import com.example.expense_tracker.dto.response.BudgetResponse;
import com.example.expense_tracker.service.BudgetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;

    @PostMapping
    public BudgetResponse createBudget(
            @Valid @RequestBody BudgetRequest request) {

        return budgetService.createBudget(request);
    }

    @GetMapping
    public List<BudgetResponse> getBudgets() {

        return budgetService.getBudgets();
    }

    @PutMapping("/{id}")
    public BudgetResponse updateBudget(
            @PathVariable Long id,
            @Valid @RequestBody BudgetRequest request) {

        return budgetService.updateBudget(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable Long id) {

        budgetService.deleteBudget(id);
    }
}