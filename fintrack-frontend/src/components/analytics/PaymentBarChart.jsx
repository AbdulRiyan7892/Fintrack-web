import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function PaymentBarChart({ data }) {

    if (!data || data.length === 0) {

        return (

            <div className="rounded-3xl bg-white p-6 shadow-lg">

                <h2 className="mb-6 text-2xl font-bold">

                    Payment Method Analysis

                </h2>

                <div className="flex h-80 items-center justify-center text-slate-400">

                    No payment data available

                </div>

            </div>

        );

    }

    return (

        <div className="rounded-3xl bg-white p-6 shadow-lg">

            <h2 className="mb-6 text-2xl font-bold">

                Payment Method Analysis

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="paymentMethod"/>

                    <YAxis/>

                    <Tooltip/>

                    <Legend/>

                    <Bar
                        dataKey="amount"
                        fill="#2563eb"
                        radius={[8,8,0,0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default PaymentBarChart;