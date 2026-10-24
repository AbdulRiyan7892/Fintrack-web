package com.example.expense_tracker.exception;

public class BudgetExceededException extends RuntimeException{

    public BudgetExceededException(String message){
        super(message);
    }

}