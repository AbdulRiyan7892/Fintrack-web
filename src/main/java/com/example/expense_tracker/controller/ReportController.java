package com.example.expense_tracker.controller;

import com.example.expense_tracker.dto.response.*;
import com.example.expense_tracker.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/monthly")
    public ApiResponse<MonthlyReportResponse> monthly(

            @RequestParam int month,

            @RequestParam int year

    ){

        return ApiResponse.<MonthlyReportResponse>builder()

                .success(true)

                .message("Monthly report generated")

                .data(reportService.getMonthlyReport(month,year))

                .build();

    }
    @GetMapping("/trend")
    public ApiResponse<List<TrendResponse>> yearlyTrend(
            @RequestParam int year
    ){

        return ApiResponse.<List<TrendResponse>>builder()
                .success(true)
                .message("Yearly trend generated successfully")
                .data(reportService.getYearlyTrend(year))
                .build();

    }
    @GetMapping("/category")
    public ApiResponse<List<CategoryReportResponse>> categoryReport(
            @RequestParam int month,
            @RequestParam int year
    ){

        return ApiResponse.<List<CategoryReportResponse>>builder()
                .success(true)
                .message("Category report generated successfully")
                .data(reportService.getCategoryReport(month, year))
                .build();

    }
    @GetMapping("/payment")
    public ApiResponse<List<PaymentReportResponse>> paymentReport(
            @RequestParam int month,
            @RequestParam int year
    ){

        return ApiResponse.<List<PaymentReportResponse>>builder()
                .success(true)
                .message("Payment report generated successfully")
                .data(reportService.getPaymentReport(month, year))
                .build();

    }

    @GetMapping("/monthly/pdf")
    public ResponseEntity<byte[]> downloadPdf(

            @RequestParam int month,

            @RequestParam int year

    ){

        byte[] pdf =
                reportService.generateMonthlyPdf(
                        month,
                        year
                );

        return ResponseEntity.ok()

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=MonthlyReport.pdf"
                )

                .contentType(MediaType.APPLICATION_PDF)

                .body(pdf);

    }
    @GetMapping("/monthly/excel")
    public ResponseEntity<byte[]> downloadExcel(
            @RequestParam int month,
            @RequestParam int year
    ){

        byte[] excel =
                reportService.generateMonthlyExcel(
                        month,
                        year
                );

        return ResponseEntity.ok()

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=MonthlyReport.xlsx"
                )

                .contentType(
                        MediaType.parseMediaType(
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        )
                )

                .body(excel);

    }
    @PostMapping("/monthly/email")
    public ResponseEntity<String> sendMonthlyReport(

            @RequestParam int month,

            @RequestParam int year

    ){

        reportService.emailMonthlyReport(
                month,
                year
        );

        return ResponseEntity.ok(
                "Monthly report emailed successfully."
        );

    }

    @GetMapping("/category/yearly")
    public ApiResponse<List<CategoryReportResponse>>
    getYearlyCategory(
            @RequestParam int year
    ){

        return ApiResponse.success(

                reportService
                        .getYearlyCategoryReport(year),

                "Yearly category report generated"

        );

    }
    @GetMapping("/payment/yearly")
    public ApiResponse<List<PaymentReportResponse>>
    getYearlyPayment(
            @RequestParam int year
    ){

        return ApiResponse.success(

                reportService
                        .getYearlyPaymentReport(year),

                "Yearly payment report generated"

        );

    }

}