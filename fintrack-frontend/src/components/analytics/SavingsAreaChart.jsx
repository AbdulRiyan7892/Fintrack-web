import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function SavingsAreaChart({ data }) {

    if (!data || data.length === 0) {

        return (

            <div className="rounded-3xl bg-white p-6 shadow-lg">

                <h2 className="mb-6 text-2xl font-bold">

                    Monthly Savings Trend

                </h2>

                <div className="flex h-80 items-center justify-center text-slate-400">

                    No savings data available

                </div>

            </div>

        );

    }

    return (

        <div className="rounded-3xl bg-white p-6 shadow-lg">

            <h2 className="mb-6 text-2xl font-bold">

                Monthly Savings Trend

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <AreaChart data={data}>

                    <defs>

                        <linearGradient
                            id="savingsColor"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="5%"
                                stopColor="#2563eb"
                                stopOpacity={0.8}
                            />

                            <stop
                                offset="95%"
                                stopColor="#2563eb"
                                stopOpacity={0}
                            />

                        </linearGradient>

                    </defs>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="month"/>

                    <YAxis/>

                    <Tooltip/>

                    <Legend/>

                    <Area
                        type="monotone"
                        dataKey="savings"
                        stroke="#2563eb"
                        strokeWidth={3}
                        fill="url(#savingsColor)"
                        name="Savings"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>

    );

}

export default SavingsAreaChart;