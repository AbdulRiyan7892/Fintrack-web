package com.example.expense_tracker.mapper;

import com.example.expense_tracker.dto.request.TransactionRequest;
import com.example.expense_tracker.dto.TransactionResponse;
import com.example.expense_tracker.entity.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    TransactionResponse toResponse(Transaction transaction);

    Transaction toEntity(TransactionRequest request);

    void updateEntity(TransactionRequest request,
                      @MappingTarget Transaction transaction);
}