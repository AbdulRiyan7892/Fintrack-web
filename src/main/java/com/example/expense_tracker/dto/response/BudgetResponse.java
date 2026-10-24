package com.example.expense_tracker.dto.response;

import com.example.expense_tracker.enums.Category;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class BudgetResponse {

    private Long id;

    private Category category;

    private BigDecimal budgetAmount;

    private BigDecimal spentAmount;

    private BigDecimal remainingAmount;

    private Double percentageUsed;

    private Integer month;

    private Integer year;

}