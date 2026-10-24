package com.example.expense_tracker.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class PaymentSummary {

    private String paymentMethod;

    private BigDecimal amount;

}