package com.example.expense_tracker.service;

import com.example.expense_tracker.dto.response.CategoryReportResponse;
import com.example.expense_tracker.dto.response.MonthlyReportResponse;
import com.example.expense_tracker.dto.response.PaymentReportResponse;
import com.example.expense_tracker.dto.response.TrendResponse;

import java.util.List;

public interface ReportService {

    MonthlyReportResponse getMonthlyReport(
            int month,
            int year
    );
    List<TrendResponse> getYearlyTrend(int year);
    List<CategoryReportResponse> getCategoryReport(
            int month,
            int year
    );
    List<PaymentReportResponse> getPaymentReport(
            int month,
            int year
    );
    byte[] generateMonthlyPdf(
            int month,
            int year
    );
    byte[] generateMonthlyExcel(
            int month,
            int year
    );
    void emailMonthlyReport(
            int month,
            int year
    );
    List<CategoryReportResponse> getYearlyCategoryReport(int year);

    List<PaymentReportResponse> getYearlyPaymentReport(int year);
}