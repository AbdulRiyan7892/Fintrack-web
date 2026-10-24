package com.example.expense_tracker.dto;

import com.example.expense_tracker.enums.Category;
import com.example.expense_tracker.enums.PaymentMethod;
import com.example.expense_tracker.enums.TransactionType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class TransactionResponse {

    private Long id;

    private String title;

    private BigDecimal amount;

    private TransactionType type;

    private Category category;

    private PaymentMethod paymentMethod;

    private String description;

    private LocalDate transactionDate;
}