package com.example.expense_tracker.service;

import com.example.expense_tracker.dto.request.ChangePasswordRequest;
import com.example.expense_tracker.dto.request.SettingsRequest;
import com.example.expense_tracker.dto.request.UpdateProfileRequest;
import com.example.expense_tracker.dto.response.SettingsResponse;
import com.example.expense_tracker.dto.response.UserResponse;

public interface UserService {

    UserResponse getCurrentUser();
    SettingsResponse getSettings();

    SettingsResponse updateSettings(
            SettingsRequest request
    );
    UserResponse updateProfile(
            UpdateProfileRequest request
    );

    void changePassword(
            ChangePasswordRequest request
    );

}