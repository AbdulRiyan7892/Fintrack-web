package com.example.expense_tracker.serviceImpl;

import com.example.expense_tracker.dto.request.BudgetRequest;
import com.example.expense_tracker.dto.response.BudgetResponse;
import com.example.expense_tracker.entity.Budget;
import com.example.expense_tracker.entity.User;
import com.example.expense_tracker.exception.BudgetAlreadyExistsException;
import com.example.expense_tracker.mapper.BudgetMapper;
import com.example.expense_tracker.repository.BudgetRepository;
import com.example.expense_tracker.repository.TransactionRepository;
import com.example.expense_tracker.service.BudgetService;
import com.example.expense_tracker.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;
    private final BudgetMapper budgetMapper;

    @Override
    public BudgetResponse createBudget(BudgetRequest request) {

        User currentUser = SecurityUtils.getCurrentUser();

        budgetRepository
                .findByUserAndCategoryAndMonthAndYear(
                        currentUser,
                        request.getCategory(),
                        request.getMonth(),
                        request.getYear()
                )
                .ifPresent(budget -> {
                    throw new BudgetAlreadyExistsException(
                            "Budget already exists for this category and month."
                    );
                });

        Budget budget = budgetMapper.toEntity(request);

        budget.setUser(currentUser);

        budget = budgetRepository.save(budget);

        return buildResponse(budget);
    }

    @Override
    public List<BudgetResponse> getBudgets() {

        User currentUser = SecurityUtils.getCurrentUser();

        return budgetRepository.findByUser(currentUser)
                .stream()
                .map(this::buildResponse)
                .toList();
    }

    @Override
    public BudgetResponse updateBudget(Long id,
                                       BudgetRequest request) {

        User currentUser = SecurityUtils.getCurrentUser();

        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        if (!budget.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Access denied");
        }

        budget.setCategory(request.getCategory());
        budget.setBudgetAmount(request.getBudgetAmount());
        budget.setMonth(request.getMonth());
        budget.setYear(request.getYear());

        budgetRepository.save(budget);

        return buildResponse(budget);
    }

    @Override
    public void deleteBudget(Long id) {

        User currentUser = SecurityUtils.getCurrentUser();

        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        if (!budget.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Access denied");
        }

        budgetRepository.delete(budget);
    }

    private BudgetResponse buildResponse(Budget budget) {

        BigDecimal spent = transactionRepository.getSpentAmount(
                budget.getUser(),
                budget.getCategory(),
                budget.getMonth(),
                budget.getYear()
        );

        BigDecimal remaining = budget.getBudgetAmount().subtract(spent);

        if (remaining.compareTo(BigDecimal.ZERO) < 0) {
            remaining = BigDecimal.ZERO;
        }

        double percentage = spent
                .divide(budget.getBudgetAmount(), 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .doubleValue();

        BudgetResponse response = budgetMapper.toResponse(budget);

        response.setSpentAmount(spent);
        response.setRemainingAmount(remaining);
        response.setPercentageUsed(percentage);

        return response;
    }
}