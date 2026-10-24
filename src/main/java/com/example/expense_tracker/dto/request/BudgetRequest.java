package com.example.expense_tracker.dto.request;

import com.example.expense_tracker.enums.Category;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class BudgetRequest {

    @NotNull
    private Category category;

    @NotNull
    private BigDecimal budgetAmount;

    @NotNull
    private Integer month;

    @NotNull
    private Integer year;

}