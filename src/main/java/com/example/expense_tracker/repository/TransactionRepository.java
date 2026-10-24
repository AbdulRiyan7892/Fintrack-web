package com.example.expense_tracker.repository;

import com.example.expense_tracker.dto.projection.CategoryReportProjection;
import com.example.expense_tracker.dto.projection.PaymentReportProjection;
import com.example.expense_tracker.dto.response.CategoryExpense;
import com.example.expense_tracker.dto.response.PaymentExpense;
import com.example.expense_tracker.entity.Transaction;
import com.example.expense_tracker.entity.User;
import com.example.expense_tracker.enums.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUser(User user);

    List<Transaction> findByUserAndCategory(User user,
                                            Category category);

    Page<Transaction> findByUser(
            User user,
            Pageable pageable
    );
    @Query("""
SELECT COALESCE(SUM(t.amount),0)
FROM Transaction t
WHERE t.user = :user
AND t.type='INCOME'
""")
    BigDecimal getTotalIncome(User user);

    @Query("""
SELECT COALESCE(SUM(t.amount),0)
FROM Transaction t
WHERE t.user = :user
AND t.type='EXPENSE'
""")
    BigDecimal getTotalExpense(User user);

    List<Transaction> findTop5ByUserOrderByTransactionDateDesc(User user);
    @Query("""
SELECT COALESCE(SUM(t.amount),0)
FROM Transaction t
WHERE t.user=:user
AND t.type='INCOME'
AND MONTH(t.transactionDate)=:month
AND YEAR(t.transactionDate)=:year
""")
    BigDecimal getMonthlyIncome(User user,int month,int year);

    @Query("""
SELECT COALESCE(SUM(t.amount),0)
FROM Transaction t
WHERE t.user=:user
AND t.type='EXPENSE'
AND MONTH(t.transactionDate)=:month
AND YEAR(t.transactionDate)=:year
""")
    BigDecimal getMonthlyExpense(User user,int month,int year);

    @Query("""
SELECT
t.category as category,
SUM(t.amount) as amount
FROM Transaction t
WHERE t.user=:user
AND t.type='EXPENSE'
GROUP BY t.category
""")
    List<CategoryExpense> getExpenseByCategory(User user);
    @Query("""
SELECT
t.paymentMethod as paymentMethod,
SUM(t.amount) as amount
FROM Transaction t
WHERE t.user=:user
AND t.type='EXPENSE'
GROUP BY t.paymentMethod
""")
    List<PaymentExpense> getExpenseByPayment(User user);
    @Query("""
SELECT COALESCE(SUM(t.amount),0)
FROM Transaction t
WHERE t.user = :user
AND t.category = :category
AND t.type = 'EXPENSE'
AND MONTH(t.transactionDate)=:month
AND YEAR(t.transactionDate)=:year
""")
    BigDecimal getSpentAmount(
            User user,
            Category category,
            Integer month,
            Integer year
    );
    @Query("""
SELECT COALESCE(SUM(t.amount),0)
FROM Transaction t
WHERE t.user=:user
AND t.type='INCOME'
AND MONTH(t.transactionDate)=:month
AND YEAR(t.transactionDate)=:year
""")
    BigDecimal getMonthlyIncome(
            User user,
            Integer month,
            Integer year
    );
    @Query("""
SELECT COALESCE(MAX(t.amount),0)
FROM Transaction t
WHERE t.user=:user
AND t.type='EXPENSE'
AND MONTH(t.transactionDate)=:month
AND YEAR(t.transactionDate)=:year
""")
    BigDecimal getHighestExpense(
            User user,
            Integer month,
            Integer year
    );
    @Query("""
SELECT t
FROM Transaction t
WHERE t.user=:user
AND MONTH(t.transactionDate)=:month
AND YEAR(t.transactionDate)=:year
ORDER BY t.transactionDate DESC
""")
    List<Transaction> findMonthlyTransactions(
            User user,
            Integer month,
            Integer year
    );
    //Top Expense Category
    @Query("""
SELECT
t.category as category,
SUM(t.amount) as amount
FROM Transaction t
WHERE t.user=:user
AND t.type='EXPENSE'
AND MONTH(t.transactionDate)=:month
AND YEAR(t.transactionDate)=:year
GROUP BY t.category
ORDER BY SUM(t.amount) DESC
""")
    List<CategoryReportProjection> getTopCategory(
            User user,
            Integer month,
            Integer year
    );
//    Top Payment Method
@Query("""
SELECT
t.paymentMethod as paymentMethod,
SUM(t.amount) as amount
FROM Transaction t
WHERE t.user=:user
AND t.type='EXPENSE'
AND MONTH(t.transactionDate)=:month
AND YEAR(t.transactionDate)=:year
GROUP BY t.paymentMethod
ORDER BY SUM(t.amount) DESC
""")
List<PaymentReportProjection> getTopPaymentMethod(
        User user,
        Integer month,
        Integer year
);
    @Query("""
SELECT COALESCE(SUM(t.amount),0)
FROM Transaction t
WHERE t.user=:user
AND t.type='EXPENSE'
AND MONTH(t.transactionDate)=:month
AND YEAR(t.transactionDate)=:year
""")
    BigDecimal getMonthlyExpense(
            User user,
            Integer month,
            Integer year
    );

    @Query("""
SELECT
t.category as category,
SUM(t.amount) as amount
FROM Transaction t
WHERE
t.user = :user
AND t.type='EXPENSE'
AND YEAR(t.transactionDate)=:year
GROUP BY t.category
ORDER BY SUM(t.amount) DESC
""")
    List<CategoryReportProjection> getYearlyCategoryReport(
            User user,
            int year
    );

    @Query("""
SELECT
t.paymentMethod as paymentMethod,
SUM(t.amount) as amount
FROM Transaction t
WHERE
t.user=:user
AND t.type='EXPENSE'
AND YEAR(t.transactionDate)=:year
GROUP BY t.paymentMethod
ORDER BY SUM(t.amount) DESC
""")
    List<PaymentReportProjection> getYearlyPaymentReport(
            User user,
            int year
    );
}