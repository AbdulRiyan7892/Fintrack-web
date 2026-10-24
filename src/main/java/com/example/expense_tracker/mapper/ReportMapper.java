package com.example.expense_tracker.mapper;

import com.example.expense_tracker.dto.TransactionResponse;
import com.example.expense_tracker.dto.projection.CategoryReportProjection;
import com.example.expense_tracker.dto.projection.PaymentReportProjection;
import com.example.expense_tracker.dto.response.CategoryReportResponse;
import com.example.expense_tracker.dto.response.PaymentReportResponse;
import com.example.expense_tracker.entity.Transaction;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReportMapper {

    TransactionResponse toResponse(Transaction transaction);
    CategoryReportResponse toCategoryResponse(
            CategoryReportProjection projection
    );

    PaymentReportResponse toPaymentResponse(
            PaymentReportProjection projection
    );

}