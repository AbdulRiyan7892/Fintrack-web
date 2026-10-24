import { Pencil, Trash2 } from "lucide-react";
import Card from "../ui/Card";

function BudgetCard({ budget, onEdit, onDelete }) {

    const percentage = Math.min(
        (budget.spentAmount / budget.budgetAmount) * 100,
        100
    );

    const progressColor =
        percentage >= 90
            ? "bg-red-500"
            : percentage >= 70
            ? "bg-yellow-500"
            : "bg-green-500";

    return (

        <Card className="h-full">

            <div className="flex items-start justify-between">

                <div>

                    <h2 className="text-lg font-semibold">

                        {budget.category}

                    </h2>

                    <p className="mt-1 text-sm text-slate-500">

                        {budget.month}/{budget.year}

                    </p>

                </div>

                <div className="flex gap-2">

                    <button
                        onClick={() => onEdit(budget)}
                        className="rounded-md border border-gray-200 p-2 hover:bg-gray-100"
                    >
                        <Pencil size={16}/>
                    </button>

                    <button
                        onClick={() => onDelete(budget.id)}
                        className="rounded-md border border-gray-200 p-2 text-red-500 hover:bg-red-50"
                    >
                        <Trash2 size={16}/>
                    </button>

                </div>

            </div>

            <div className="mt-6">

                <div className="mb-2 flex justify-between text-sm">

                    <span className="text-slate-500">

                        ₹{budget.spentAmount}

                    </span>

                    <span className="font-medium">

                        ₹{budget.budgetAmount}

                    </span>

                </div>

                <div className="h-2 rounded-full bg-gray-200">

                    <div
                        className={`h-2 rounded-full ${progressColor}`}
                        style={{
                            width: `${percentage}%`
                        }}
                    />

                </div>

            </div>

            <div className="mt-5 flex items-center justify-between">

                <span className="text-sm font-medium">

                    {percentage.toFixed(0)}%

                </span>

                <span
                    className={`rounded-md px-3 py-1 text-xs font-medium ${
                        percentage >= 90
                            ? "bg-red-100 text-red-600"
                            : percentage >= 70
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                    }`}
                >

                    {percentage >= 100
                        ? "Exceeded"
                        : percentage >= 70
                        ? "Warning"
                        : "Healthy"}

                </span>

            </div>

        </Card>

    );
}

export default BudgetCard;