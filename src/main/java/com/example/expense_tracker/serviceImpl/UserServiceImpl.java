package com.example.expense_tracker.serviceImpl;

import com.example.expense_tracker.dto.request.SettingsRequest;
import com.example.expense_tracker.dto.response.SettingsResponse;
import com.example.expense_tracker.dto.response.UserResponse;
import com.example.expense_tracker.entity.User;
import com.example.expense_tracker.enums.Currency;
import com.example.expense_tracker.mapper.UserMapper;
import com.example.expense_tracker.repository.UserRepository;
import com.example.expense_tracker.service.UserService;
import com.example.expense_tracker.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.expense_tracker.dto.request.UpdateProfileRequest;
import com.example.expense_tracker.dto.request.ChangePasswordRequest;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public UserResponse updateProfile(
            UpdateProfileRequest request
    ) {

        User currentUser =
                SecurityUtils.getCurrentUser();

        currentUser.setName(
                request.getName()
        );

        currentUser.setCurrency(
                Currency.valueOf(request.getCurrency())
        );

        userRepository.save(currentUser);

        return userMapper.toResponse(currentUser);

    }
    @Override
    public void changePassword(
            ChangePasswordRequest request
    ) {

        User currentUser =
                SecurityUtils.getCurrentUser();

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                currentUser.getPassword()
        )) {

            throw new RuntimeException(
                    "Current password is incorrect."
            );

        }

        currentUser.setPassword(

                passwordEncoder.encode(

                        request.getNewPassword()

                )

        );

        userRepository.save(currentUser);

    }
    @Override
    public UserResponse getCurrentUser() {

        User currentUser = SecurityUtils.getCurrentUser();

        return userMapper.toResponse(currentUser);
    }
    @Override
    public SettingsResponse getSettings() {

        User currentUser = SecurityUtils.getCurrentUser();

        return SettingsResponse.builder()
                .emailFrequency(currentUser.getEmailFrequency())
                .build();
    }
    @Override
    public SettingsResponse updateSettings(
            SettingsRequest request
    ) {

        User currentUser = SecurityUtils.getCurrentUser();

        currentUser.setEmailFrequency(
                request.getEmailFrequency()
        );

        userRepository.save(currentUser);

        return SettingsResponse.builder()
                .emailFrequency(currentUser.getEmailFrequency())
                .build();
    }
}