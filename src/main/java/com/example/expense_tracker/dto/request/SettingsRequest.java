package com.example.expense_tracker.dto.request;

import com.example.expense_tracker.enums.EmailFrequency;
import lombok.Data;

@Data
public class SettingsRequest {

    private EmailFrequency emailFrequency;

}