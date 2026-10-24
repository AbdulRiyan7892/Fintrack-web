import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#2563eb",
    "#22c55e",
    "#ef4444",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4"
];

function ExpensePieChart({ data }) {

    return (

        <ResponsiveContainer
            width="100%"
            height={320}
        >

            <PieChart>

                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="category"
                    outerRadius={120}
                    label
                >

                    {
                        data.map((entry,index)=>(

                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />

                        ))
                    }

                </Pie>

                <Tooltip/>

            </PieChart>

        </ResponsiveContainer>

    );

}

export default ExpensePieChart;