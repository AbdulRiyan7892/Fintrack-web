package com.example.expense_tracker.serviceImpl;

import com.example.expense_tracker.dto.request.TransactionRequest;
import com.example.expense_tracker.dto.TransactionResponse;
import com.example.expense_tracker.dto.response.TransactionResultResponse;
import com.example.expense_tracker.entity.Transaction;
import com.example.expense_tracker.entity.User;
import com.example.expense_tracker.enums.TransactionType;
import com.example.expense_tracker.exception.TransactionNotFoundException;
import com.example.expense_tracker.exception.UnauthorizedTransactionAccessException;
import com.example.expense_tracker.mapper.TransactionMapper;
import com.example.expense_tracker.repository.BudgetRepository;
import com.example.expense_tracker.repository.TransactionRepository;
import com.example.expense_tracker.service.TransactionService;
import com.example.expense_tracker.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private static final Logger logger =
            LoggerFactory.getLogger(TransactionServiceImpl.class);
    private final TransactionRepository transactionRepository;
    private final BudgetRepository budgetRepository;
    private final TransactionMapper transactionMapper;
    @Override
    public TransactionResponse addTransaction(TransactionRequest request) {

        User currentUser = SecurityUtils.getCurrentUser();

        Transaction transaction = transactionMapper.toEntity(request);

        transaction.setUser(currentUser);

        Transaction saved = transactionRepository.save(transaction);
        logger.info(
                "Transaction created successfully for user {}",
                currentUser.getEmail()
        );
        if (saved.getType() == TransactionType.EXPENSE) {

            budgetRepository.findByUserAndCategoryAndMonthAndYear(
                    currentUser,
                    saved.getCategory(),
                    saved.getTransactionDate().getMonthValue(),
                    saved.getTransactionDate().getYear()
            ).ifPresent(budget -> {

                BigDecimal spent = transactionRepository.getSpentAmount(
                        currentUser,
                        saved.getCategory(),
                        saved.getTransactionDate().getMonthValue(),
                        saved.getTransactionDate().getYear()
                );

                if (spent.compareTo(budget.getBudgetAmount()) > 0) {

                    logger.warn(
                            "Budget exceeded for {} by user {}",
                            saved.getCategory(),
                            currentUser.getEmail()
                    );

                }

            });
        }
        return transactionMapper.toResponse(saved);
    }

    @Override
    public Page<TransactionResponse> getAllTransactions(int page, int size) {

        User currentUser = SecurityUtils.getCurrentUser();

        logger.info("Fetching transactions for user {}", currentUser.getEmail());

        Pageable pageable = PageRequest.of(page, size);

        return transactionRepository
                .findByUser(currentUser, pageable)
                .map(transactionMapper::toResponse);
    }

    @Override
    public TransactionResponse getTransaction(Long id) {

        User currentUser = SecurityUtils.getCurrentUser();

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new TransactionNotFoundException("Transaction not found"));

        if (!transaction.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedTransactionAccessException(
                    "You are not allowed to access this transaction."
            );
        }

        return transactionMapper.toResponse(transaction);
    }

    @Override
    public TransactionResponse updateTransaction(Long id, TransactionRequest request) {

        User currentUser = SecurityUtils.getCurrentUser();

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new TransactionNotFoundException("Transaction not found"));

        if (!transaction.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedTransactionAccessException(
                    "You are not allowed to access this transaction."
            );
        }

        transactionMapper.updateEntity(request, transaction);

        return transactionMapper.toResponse(transactionRepository.save(transaction));
    }

    @Override
    public void deleteTransaction(Long id) {

        User currentUser = SecurityUtils.getCurrentUser();

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new TransactionNotFoundException("Transaction not found"));

        if (!transaction.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedTransactionAccessException(
                    "You are not allowed to access this transaction."
            );
        }

        transactionRepository.delete(transaction);
    }


}