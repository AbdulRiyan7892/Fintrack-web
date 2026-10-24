package com.example.expense_tracker.service;

import com.example.expense_tracker.dto.request.TransactionRequest;
import com.example.expense_tracker.dto.TransactionResponse;
import com.example.expense_tracker.dto.response.TransactionResultResponse;
import org.springframework.data.domain.Page;

public interface TransactionService {

    TransactionResponse addTransaction(TransactionRequest request);

    Page<TransactionResponse> getAllTransactions(
            int page,
            int size
    );

    TransactionResponse getTransaction(Long id);

    TransactionResponse updateTransaction(Long id,
                                          TransactionRequest request);

    void deleteTransaction(Long id);

}