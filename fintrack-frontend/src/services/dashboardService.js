import { getMonthlyReport } from "../api/reportApi";

export const fetchDashboardData = async () => {

    const today = new Date();

    const month = today.getMonth() + 1;

    const year = today.getFullYear();

    const response = await getMonthlyReport(month, year);

    return response.data.data;
};