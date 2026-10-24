package com.example.expense_tracker.dto.response;

import com.example.expense_tracker.enums.Currency;
import com.example.expense_tracker.enums.EmailFrequency;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {

    private Long id;

    private String name;

    private String email;

    private Currency currency;

    private Boolean enabled;
    private EmailFrequency emailFrequency;

}