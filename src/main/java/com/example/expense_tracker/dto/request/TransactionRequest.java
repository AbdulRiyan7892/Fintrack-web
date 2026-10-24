package com.example.expense_tracker.dto.request;

import com.example.expense_tracker.enums.Category;
import com.example.expense_tracker.enums.PaymentMethod;
import com.example.expense_tracker.enums.TransactionType;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TransactionRequest {

    @NotBlank
    private String title;

    @DecimalMin("0.01")
    private BigDecimal amount;

    @NotNull
    private TransactionType type;

    @NotNull
    private Category category;

    @NotNull
    private PaymentMethod paymentMethod;

    private String description;

    @NotNull
    private LocalDate transactionDate;
}