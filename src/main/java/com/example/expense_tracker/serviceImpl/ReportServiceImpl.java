package com.example.expense_tracker.serviceImpl;

import com.example.expense_tracker.dto.TransactionResponse;
import com.example.expense_tracker.dto.projection.CategoryReportProjection;
import com.example.expense_tracker.dto.projection.PaymentReportProjection;
import com.example.expense_tracker.dto.response.CategoryReportResponse;
import com.example.expense_tracker.dto.response.MonthlyReportResponse;
import com.example.expense_tracker.dto.response.TrendResponse;
import com.example.expense_tracker.email.EmailService;
import com.example.expense_tracker.entity.User;
import com.example.expense_tracker.excel.ExcelReportGenerator;
import com.example.expense_tracker.mapper.ReportMapper;
import com.example.expense_tracker.mapper.TransactionMapper;
import com.example.expense_tracker.pdf.PdfReportGenerator;
import com.example.expense_tracker.repository.TransactionRepository;
import com.example.expense_tracker.service.ReportService;
import com.example.expense_tracker.util.SecurityUtils;
import com.example.expense_tracker.dto.response.PaymentReportResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Month;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReportServiceImpl implements ReportService {

    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;
    private final ReportMapper reportMapper;
    private final PdfReportGenerator pdfReportGenerator;
    private final ExcelReportGenerator excelReportGenerator;
    private final EmailService emailService;

    @Override
    public List<CategoryReportResponse> getYearlyCategoryReport(
            int year
    ) {

        User currentUser =
                SecurityUtils.getCurrentUser();

        return transactionRepository
                .getYearlyCategoryReport(
                        currentUser,
                        year
                )
                .stream()
                .map(category ->
                        CategoryReportResponse
                                .builder()
                                .category(
                                        category.getCategory()
                                )
                                .amount(
                                        category.getAmount()
                                )
                                .build()
                )
                .toList();

    }
    @Override
    public List<PaymentReportResponse> getYearlyPaymentReport(
            int year
    ) {

        User currentUser =
                SecurityUtils.getCurrentUser();

        return transactionRepository
                .getYearlyPaymentReport(
                        currentUser,
                        year
                )
                .stream()
                .map(reportMapper::toPaymentResponse)
                .toList();

    }
    @Override
    public void emailMonthlyReport(int month, int year) {

        User currentUser = SecurityUtils.getCurrentUser();

        byte[] pdf = generateMonthlyPdf(month, year);

        byte[] excel = generateMonthlyExcel(month, year);

        emailService.sendMonthlyReport(
                currentUser.getEmail(),
                currentUser.getName(),
                month,
                year,
                pdf,
                excel
        );
    }
    public byte[] generateMonthlyExcel(
            User user,
            int month,
            int year
    ) {

        return excelReportGenerator.generate(
                getMonthlyReport(user, month, year)
        );

    }
    @Override
    public byte[] generateMonthlyExcel(
            int month,
            int year
    ) {

        return generateMonthlyExcel(
                SecurityUtils.getCurrentUser(),
                month,
                year
        );

    }
    @Override
    public byte[] generateMonthlyPdf(
            int month,
            int year
    ) {

        return generateMonthlyPdf(
                SecurityUtils.getCurrentUser(),
                month,
                year
        );

    }
    public MonthlyReportResponse getMonthlyReport(
            User user,
            int month,
            int year
    ) {

        log.info("Generating monthly report for user: {} Month: {} Year: {}",
                user.getEmail(), month, year);

        BigDecimal income = transactionRepository.getMonthlyIncome(user, month, year);

        BigDecimal expense = transactionRepository.getMonthlyExpense(user, month, year);

        BigDecimal savings = income.subtract(expense);

        BigDecimal highestExpense =
                transactionRepository.getHighestExpense(user, month, year);

        List<TransactionResponse> transactions =
                transactionRepository.findMonthlyTransactions(user, month, year)
                        .stream()
                        .map(transactionMapper::toResponse)
                        .toList();

        List<CategoryReportProjection> categories =
                transactionRepository.getTopCategory(user, month, year);

        String topCategory =
                categories.isEmpty()
                        ? "N/A"
                        : categories.getFirst().getCategory();

        List<PaymentReportProjection> payments =
                transactionRepository.getTopPaymentMethod(user, month, year);

        String topPayment =
                payments.isEmpty()
                        ? "N/A"
                        : payments.getFirst().getPaymentMethod();

        int days = YearMonth.of(year, month).lengthOfMonth();

        BigDecimal average =
                expense.divide(
                        BigDecimal.valueOf(days),
                        2,
                        RoundingMode.HALF_UP
                );

        String reportMonth =
                Month.of(month)
                        .getDisplayName(TextStyle.FULL, Locale.ENGLISH)
                        + " "
                        + year;

        return MonthlyReportResponse.builder()
                .month(reportMonth)
                .totalIncome(income)
                .totalExpense(expense)
                .totalSavings(savings)
                .highestExpense(highestExpense)
                .averageDailyExpense(average)
                .topExpenseCategory(topCategory)
                .topPaymentMethod(topPayment)
                .transactions(transactions)
                .build();
    }
    @Override
    public MonthlyReportResponse getMonthlyReport(
            int month,
            int year
    ) {

        return getMonthlyReport(
                SecurityUtils.getCurrentUser(),
                month,
                year
        );

    }
    public byte[] generateMonthlyPdf(
            User user,
            int month,
            int year
    ) {

        return pdfReportGenerator.generate(
                getMonthlyReport(user, month, year)
        );

    }
    @Override
    public List<TrendResponse> getYearlyTrend(int year) {

        User currentUser = SecurityUtils.getCurrentUser();

        List<TrendResponse> trends = new java.util.ArrayList<>();

        for (int month = 1; month <= 12; month++) {

            BigDecimal income = transactionRepository.getMonthlyIncome(
                    currentUser,
                    month,
                    year
            );

            BigDecimal expense = transactionRepository.getMonthlyExpense(
                    currentUser,
                    month,
                    year
            );

            BigDecimal savings = income.subtract(expense);

            String monthName = java.time.Month.of(month)
                    .getDisplayName(
                            java.time.format.TextStyle.FULL,
                            java.util.Locale.ENGLISH
                    );

            trends.add(
                    TrendResponse.builder()
                            .month(monthName)
                            .income(income)
                            .expense(expense)
                            .savings(savings)
                            .build()
            );

        }

        return trends;

    }
    @Override
    public List<CategoryReportResponse> getCategoryReport(
            int month,
            int year
    ) {

        User currentUser = SecurityUtils.getCurrentUser();

        return transactionRepository
                .getTopCategory(currentUser, month, year)
                .stream()
                .map(category -> CategoryReportResponse.builder()
                        .category(category.getCategory())
                        .amount(category.getAmount())
                        .build())
                .toList();

    }
    @Override
    public List<PaymentReportResponse> getPaymentReport(
            int month,
            int year
    ) {

        User currentUser = SecurityUtils.getCurrentUser();

        return transactionRepository
                .getTopPaymentMethod(
                        currentUser,
                        month,
                        year
                )
                .stream()
                .map(reportMapper::toPaymentResponse)
                .toList();

    }
}