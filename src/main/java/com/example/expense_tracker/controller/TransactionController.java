package com.example.expense_tracker.controller;

import com.example.expense_tracker.dto.request.TransactionRequest;
import com.example.expense_tracker.dto.TransactionResponse;
import com.example.expense_tracker.dto.response.ApiResponse;
import com.example.expense_tracker.dto.response.TransactionResultResponse;
import com.example.expense_tracker.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public ApiResponse<TransactionResponse> addTransaction(
            @Valid @RequestBody TransactionRequest request){

        return ApiResponse.<TransactionResponse>builder()
                .success(true)
                .message("Transaction created successfully")
                .data(transactionService.addTransaction(request))
                .build();
    }

    @GetMapping
    public ApiResponse<Page<TransactionResponse>> getAllTransactions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){

        return ApiResponse.<Page<TransactionResponse>>builder()
                .success(true)
                .message("Transactions fetched successfully")
                .data(transactionService.getAllTransactions(page,size))
                .build();
    }
    @GetMapping("/{id}")
    public TransactionResponse getTransaction(@PathVariable Long id) {

        return transactionService.getTransaction(id);
    }

    @PutMapping("/{id}")
    public TransactionResponse updateTransaction(
            @PathVariable Long id,
            @Valid @RequestBody TransactionRequest request) {

        return transactionService.updateTransaction(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {

        transactionService.deleteTransaction(id);
    }
}