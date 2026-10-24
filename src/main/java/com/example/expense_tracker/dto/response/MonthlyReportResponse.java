package com.example.expense_tracker.dto.response;

import com.example.expense_tracker.dto.TransactionResponse;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class MonthlyReportResponse {

    private String month;

    private BigDecimal totalIncome;

    private BigDecimal totalExpense;

    private BigDecimal totalSavings;

    private BigDecimal highestExpense;

    private BigDecimal averageDailyExpense;

    private String topExpenseCategory;

    private String topPaymentMethod;

    private List<TransactionResponse> transactions;

}