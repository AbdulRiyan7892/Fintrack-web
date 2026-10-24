package com.example.expense_tracker.dto.response;

import java.math.BigDecimal;

public interface PaymentExpense {

    String getPaymentMethod();

    BigDecimal getAmount();

}