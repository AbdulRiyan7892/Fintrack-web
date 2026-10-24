package com.example.expense_tracker.dto.projection;

import java.math.BigDecimal;

public interface PaymentReportProjection {

    String getPaymentMethod();

    BigDecimal getAmount();

}