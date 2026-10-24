package com.example.expense_tracker.exception;

public class UnauthorizedTransactionAccessException extends RuntimeException {

    public UnauthorizedTransactionAccessException(String message) {
        super(message);
    }
}