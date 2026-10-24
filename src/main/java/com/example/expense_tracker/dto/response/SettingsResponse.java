package com.example.expense_tracker.dto.response;

import com.example.expense_tracker.enums.EmailFrequency;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SettingsResponse {

    private EmailFrequency emailFrequency;

}