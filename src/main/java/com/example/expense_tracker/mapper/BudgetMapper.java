package com.example.expense_tracker.mapper;

import com.example.expense_tracker.dto.request.BudgetRequest;
import com.example.expense_tracker.dto.response.BudgetResponse;
import com.example.expense_tracker.entity.Budget;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BudgetMapper {

    Budget toEntity(BudgetRequest request);

    BudgetResponse toResponse(Budget budget);

}