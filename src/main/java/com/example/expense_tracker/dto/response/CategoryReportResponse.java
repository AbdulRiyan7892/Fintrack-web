package com.example.expense_tracker.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class CategoryReportResponse {

    private String category;

    private BigDecimal amount;

}