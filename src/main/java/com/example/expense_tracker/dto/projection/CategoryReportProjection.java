package com.example.expense_tracker.dto.projection;

import java.math.BigDecimal;

public interface CategoryReportProjection {

    String getCategory();

    BigDecimal getAmount();

}