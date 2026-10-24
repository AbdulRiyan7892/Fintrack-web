package com.example.expense_tracker.serviceImpl;

import com.example.expense_tracker.dto.response.*;
import com.example.expense_tracker.dto.*;
import com.example.expense_tracker.entity.Transaction;
import com.example.expense_tracker.entity.User;
import com.example.expense_tracker.repository.TransactionRepository;
import com.example.expense_tracker.service.DashboardService;
import com.example.expense_tracker.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final TransactionRepository transactionRepository;

    @Override
    public DashboardResponse getDashboard() {

        User currentUser = SecurityUtils.getCurrentUser();

        BigDecimal income =
                transactionRepository.getTotalIncome(currentUser);

        BigDecimal expense =
                transactionRepository.getTotalExpense(currentUser);

        BigDecimal balance = income.subtract(expense);

        LocalDate today = LocalDate.now();

        BigDecimal monthlyIncome =
                transactionRepository.getMonthlyIncome(
                        currentUser,
                        today.getMonthValue(),
                        today.getYear());

        BigDecimal monthlyExpense =
                transactionRepository.getMonthlyExpense(
                        currentUser,
                        today.getMonthValue(),
                        today.getYear());

        List<TransactionResponse> recent =
                transactionRepository
                        .findTop5ByUserOrderByTransactionDateDesc(currentUser)
                        .stream()
                        .map(this::mapToResponse)
                        .toList();

        List<CategorySummary> categorySummary =
                transactionRepository.getExpenseByCategory(currentUser)
                        .stream()
                        .map(c -> new CategorySummary(
                                c.getCategory(),
                                c.getAmount()))
                        .toList();

        List<PaymentSummary> paymentSummary =
                transactionRepository.getExpenseByPayment(currentUser)
                        .stream()
                        .map(p -> new PaymentSummary(
                                p.getPaymentMethod(),
                                p.getAmount()))
                        .toList();

        return DashboardResponse.builder()

                .totalIncome(income)

                .totalExpense(expense)

                .currentBalance(balance)

                .monthlyIncome(monthlyIncome)

                .monthlyExpense(monthlyExpense)

                .recentTransactions(recent)

                .expenseByCategory(categorySummary)

                .expenseByPaymentMethod(paymentSummary)

                .build();

    }

    private TransactionResponse mapToResponse(Transaction transaction){

        return TransactionResponse.builder()

                .id(transaction.getId())

                .title(transaction.getTitle())

                .amount(transaction.getAmount())

                .category(transaction.getCategory())

                .paymentMethod(transaction.getPaymentMethod())

                .type(transaction.getType())

                .description(transaction.getDescription())

                .transactionDate(transaction.getTransactionDate())

                .build();

    }

}