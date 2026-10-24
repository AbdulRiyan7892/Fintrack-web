import api from "./axios";

export const getCurrentUser = () =>
    api.get("/users/me");

export const updateProfile = (data) =>
    api.put("/users/profile", data);

export const getSettings = () =>
    api.get("/users/settings");

export const updateSettings = (data) =>
    api.put("/users/settings", data);

export const changePassword = (data) =>
    api.put("/users/change-password", data);