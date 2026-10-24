import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function TrendChart({ data }) {

    return (

        <div className="rounded-3xl bg-white p-6 shadow-lg">

            <h2 className="mb-6 text-2xl font-bold">

                Income vs Expense vs Savings

            </h2>

            <ResponsiveContainer
                width="100%"
                height={400}
            >

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#16a34a"
                        strokeWidth={3}
                        name="Income"
                    />

                    <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="#ef4444"
                        strokeWidth={3}
                        name="Expense"
                    />

                    <Line
                        type="monotone"
                        dataKey="savings"
                        stroke="#2563eb"
                        strokeWidth={3}
                        name="Savings"
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default TrendChart;