import api from "./axios";

export const getMonthlyReport = (month, year) =>
    api.get(`/reports/monthly?month=${month}&year=${year}`);

export const getYearlyTrend = (year) =>
    api.get(`/reports/trend?year=${year}`);

export const getCategoryReport = (month, year) =>
    api.get(`/reports/category?month=${month}&year=${year}`);

export const getPaymentReport = (month, year) =>
    api.get(`/reports/payment?month=${month}&year=${year}`);

export const downloadPdf = (month, year) =>
    api.get(
        `/reports/monthly/pdf?month=${month}&year=${year}`,
        {
            responseType: "blob",
        }
    );

export const downloadExcel = (month, year) =>
    api.get(
        `/reports/monthly/excel?month=${month}&year=${year}`,
        {
            responseType: "blob",
        }
    );

export const emailReport = (month, year) =>
    api.post(
        `/reports/monthly/email?month=${month}&year=${year}`
    );