package com.example.expense_tracker.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class TrendResponse {

    private String month;

    private BigDecimal income;

    private BigDecimal expense;

    private BigDecimal savings;

}