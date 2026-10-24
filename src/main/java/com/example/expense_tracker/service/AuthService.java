package com.example.expense_tracker.service;

import com.example.expense_tracker.dto.AuthResponse;
import com.example.expense_tracker.dto.request.LoginRequest;
import com.example.expense_tracker.dto.request.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}