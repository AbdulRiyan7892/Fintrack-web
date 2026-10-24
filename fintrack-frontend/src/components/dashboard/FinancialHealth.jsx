import Card from "../ui/Card";

export default function FinancialHealth({
  income,
  expense,
  savings,
}) {

  const savingRate =
    income > 0
      ? ((savings / income) * 100).toFixed(1)
      : 0;

  return (
    <Card>

      <h2 className="mb-6 text-lg font-semibold">

        Financial Health

      </h2>

      <div className="space-y-5">

        <div>

          <div className="mb-2 flex justify-between">

            <span className="text-sm text-slate-500">

              Savings Rate

            </span>

            <span className="font-medium">

              {savingRate}%

            </span>

          </div>

          <div className="h-2 rounded-full bg-gray-200">

            <div
              className="h-2 rounded-full bg-blue-600"
              style={{
                width: `${Math.min(
                  savingRate,
                  100
                )}%`,
              }}
            />

          </div>

        </div>

        <div>

          <p className="text-sm text-slate-500">

            Monthly Income

          </p>

          <h3 className="mt-1 text-xl font-semibold">

            ₹{income}

          </h3>

        </div>

        <div>

          <p className="text-sm text-slate-500">

            Monthly Expense

          </p>

          <h3 className="mt-1 text-xl font-semibold text-red-500">

            ₹{expense}

          </h3>

        </div>

      </div>

    </Card>
  );
}