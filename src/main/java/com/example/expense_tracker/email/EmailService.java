package com.example.expense_tracker.email;

public interface EmailService {

    void sendMonthlyReport(
            String email,
            String name,
            int month,
            int year,
            byte[] pdf,
            byte[] excel
    );

}