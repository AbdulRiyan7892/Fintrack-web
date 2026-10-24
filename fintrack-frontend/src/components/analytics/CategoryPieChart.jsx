import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f97316",
    "#dc2626",
    "#7c3aed",
    "#0891b2",
    "#e11d48"
];

function CategoryPieChart({ data }) {

    if (!data || data.length === 0) {

        return (

            <div className="rounded-3xl bg-white p-6 shadow-lg">

                <h2 className="mb-6 text-2xl font-bold">

                    Expense Categories

                </h2>

                <div className="flex h-80 items-center justify-center text-slate-400">

                    No expense data available

                </div>

            </div>

        );

    }

    return (

        <div className="rounded-3xl bg-white p-6 shadow-lg">

            <h2 className="mb-6 text-2xl font-bold">

                Expense Categories

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="category"
                        outerRadius={120}
                        label
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={
                                    COLORS[
                                        index % COLORS.length
                                    ]
                                }
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default CategoryPieChart;