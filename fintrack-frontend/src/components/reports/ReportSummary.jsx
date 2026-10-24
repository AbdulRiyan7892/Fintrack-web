import Card from "../ui/Card";

function StatCard({ title, value, color }) {

    return (

        <Card className="h-full">

            <p className="text-sm font-medium text-slate-500">

                {title}

            </p>

            <h2 className={`mt-2 text-2xl font-semibold ${color}`}>

                {value}

            </h2>

        </Card>

    );

}
function ReportSummary({ report }) {

    if (!report) return null;

    return (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatCard
                title="Income"
                value={`₹${report.totalIncome}`}
                color="text-green-600"
            />

            <StatCard
                title="Expense"
                value={`₹${report.totalExpense}`}
                color="text-red-500"
            />

            <StatCard
                title="Savings"
                value={`₹${report.totalSavings}`}
                color="text-blue-600"
            />

            <StatCard
                title="Highest Expense"
                value={`₹${report.highestExpense}`}
                color="text-orange-500"
            />

            <StatCard
                title="Average Daily Expense"
                value={`₹${report.averageDailyExpense}`}
                color="text-purple-600"
            />

            <StatCard
                title="Top Category"
                value={report.topExpenseCategory}
                color="text-indigo-600"
            />

            <StatCard
                title="Top Payment"
                value={report.topPaymentMethod}
                color="text-pink-600"
            />

            <StatCard
                title="Report Month"
                value={report.month}
                color="text-slate-700"
            />

        </div>

    );

}

export default ReportSummary;