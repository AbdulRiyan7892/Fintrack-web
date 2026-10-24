package com.example.expense_tracker.dto.response;

import com.example.expense_tracker.dto.TransactionResponse;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class DashboardResponse {

    private BigDecimal totalIncome;

    private BigDecimal totalExpense;

    private BigDecimal currentBalance;

    private BigDecimal monthlyIncome;

    private BigDecimal monthlyExpense;

    private List<TransactionResponse> recentTransactions;

    private List<CategorySummary> expenseByCategory;

    private List<PaymentSummary> expenseByPaymentMethod;

}