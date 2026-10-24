package com.example.expense_tracker.dto.response;

import com.example.expense_tracker.dto.TransactionResponse;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class TransactionResultResponse {

    private TransactionResponse transaction;

    private boolean budgetExceeded;

    private BigDecimal remainingBudget;

    private String warning;
}