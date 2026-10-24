import api from "./axios";

export const getTrend = (year) =>
    api.get(`/reports/trend?year=${year}`);

//export const getCategoryAnalytics = (month, year) =>
//    api.get(`/reports/category?month=${month}&year=${year}`);

export const getPaymentAnalytics = (year) =>
    api.get(
        `/reports/payment/yearly?year=${year}`
    );
export const getMonthlyReport = (month, year) =>
    api.get(`/reports/monthly?month=${month}&year=${year}`);

export const getCategoryAnalytics = (year) =>
    api.get(
        `/reports/category/yearly?year=${year}`
    );