import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Bar
} from "recharts";

function IncomeExpenseChart({ report }) {

    const data = [
        {
            name: "Income",
            amount: report.totalIncome
        },
        {
            name: "Expense",
            amount: report.totalExpense
        },
        {
            name: "Savings",
            amount: report.totalSavings
        }
    ];

    return (

        <ResponsiveContainer
            width="80%"
            height={280}
        >

            <BarChart data={data}>

                <CartesianGrid strokeDasharray="4 4"/>

                <XAxis dataKey="name"/>

                <YAxis/>

                <Tooltip/>

                <Bar
                    dataKey="amount"
                    fill="#2563eb"
                    radius={[6,6,0,0]}
                />

            </BarChart>

        </ResponsiveContainer>

    );

}

export default IncomeExpenseChart;