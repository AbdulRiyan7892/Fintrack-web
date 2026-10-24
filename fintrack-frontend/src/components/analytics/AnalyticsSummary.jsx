import Card from "../ui/Card.jsx";

function SummaryCard({
    title,
    value,
    color
}){

    return(

<Card className="h-full">

<p className="text-sm font-medium text-slate-500">

{title}

</p>

<h2 className={`mt-2 text-2xl font-semibold ${color}`}>

{value}

</h2>

</Card>

)

}

function AnalyticsSummary({report}){

if(!report)return null;

return(

<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

<SummaryCard
title="Income"
value={`₹${report.totalIncome}`}
color="text-green-600"
/>

<SummaryCard
title="Expense"
value={`₹${report.totalExpense}`}
color="text-red-500"
/>

<SummaryCard
title="Savings"
value={`₹${report.totalSavings}`}
color="text-blue-600"
/>

<SummaryCard
title="Budget Used"
value={`${report.budgetUsed}%`}
color="text-orange-500"
/>

</div>

)

}

export default AnalyticsSummary;