package com.example.expense_tracker.dto.projection;

import java.math.BigDecimal;

public interface MonthlyTrendProjection {

    Integer getMonth();

    BigDecimal getIncome();

    BigDecimal getExpense();

}