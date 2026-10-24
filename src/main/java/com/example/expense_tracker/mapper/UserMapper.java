package com.example.expense_tracker.mapper;

import com.example.expense_tracker.dto.response.UserResponse;
import com.example.expense_tracker.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toResponse(User user);

}