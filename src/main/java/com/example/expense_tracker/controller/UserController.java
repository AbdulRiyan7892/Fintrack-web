package com.example.expense_tracker.controller;

import com.example.expense_tracker.dto.request.ChangePasswordRequest;
import com.example.expense_tracker.dto.request.SettingsRequest;
import com.example.expense_tracker.dto.request.UpdateProfileRequest;
import com.example.expense_tracker.dto.response.ApiResponse;
import com.example.expense_tracker.dto.response.SettingsResponse;
import com.example.expense_tracker.dto.response.UserResponse;
import com.example.expense_tracker.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ApiResponse<UserResponse> getCurrentUser() {

        return ApiResponse.<UserResponse>builder()
                .success(true)
                .message("User profile fetched successfully")
                .data(userService.getCurrentUser())
                .build();
    }
    @GetMapping("/settings")
    public ApiResponse<SettingsResponse> getSettings() {

        return ApiResponse.<SettingsResponse>builder()
                .success(true)
                .message("Settings fetched successfully")
                .data(userService.getSettings())
                .build();
    }
    @PutMapping("/settings")
    public ApiResponse<SettingsResponse> updateSettings(
            @RequestBody SettingsRequest request
    ) {

        return ApiResponse.<SettingsResponse>builder()
                .success(true)
                .message("Settings updated successfully")
                .data(userService.updateSettings(request))
                .build();
    }
    @PutMapping("/profile")
    public ApiResponse<UserResponse> updateProfile(
            @RequestBody
            @Valid
            UpdateProfileRequest request
    ){

        return ApiResponse.success(

                userService.updateProfile(request),

                "Profile updated successfully"

        );

    }
    @PutMapping("/change-password")
    public ApiResponse<Void> changePassword(

            @RequestBody
            @Valid
            ChangePasswordRequest request

    ){

        userService.changePassword(request);

        return ApiResponse.success(

                null,

                "Password updated successfully"

        );

    }

}