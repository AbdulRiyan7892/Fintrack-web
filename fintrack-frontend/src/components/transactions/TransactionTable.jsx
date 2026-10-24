import { Pencil, Trash2 } from "lucide-react";
import Card from "../ui/Card";

function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}) {
  if (transactions.length === 0) {
    return (
      <Card className="py-16 text-center">
        <h2 className="text-lg font-medium text-slate-500">
          No transactions available
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Start by adding your first transaction.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-0">

      <table className="min-w-full">

        <thead className="border-b bg-slate-50">

          <tr className="text-xs uppercase tracking-wide text-slate-500">

            <th className="px-6 py-4 text-left font-semibold">
              Date
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Transaction
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Category
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Amount
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Payment
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Type
            </th>

            <th className="px-6 py-4 text-center font-semibold">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {transactions.map((transaction) => (

            <tr
              key={transaction.id}
              className="border-b border-gray-100 transition hover:bg-blue-50"
            >

              <td className="px-6 py-5 text-sm text-slate-600">

                {transaction.transactionDate}

              </td>

              <td className="px-6 py-5">

                <div>

                  <p className="font-medium text-slate-800">

                    {transaction.title}

                  </p>

                </div>

              </td>

              <td className="px-6 py-5">

                <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">

                  {transaction.category}

                </span>

              </td>

              <td
                className={`px-6 py-5 text-sm font-semibold ${
                  transaction.type === "INCOME"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >

                ₹{transaction.amount}

              </td>

              <td className="px-6 py-5">

                <span className="text-sm text-slate-600">

                  {transaction.paymentMethod}

                </span>

              </td>

              <td className="px-6 py-5">

                <span
                  className={`rounded-md px-3 py-1 text-xs font-medium ${
                    transaction.type === "INCOME"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >

                  {transaction.type}

                </span>

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => onEdit(transaction)}
                    className="rounded-md border border-gray-200 p-2 transition hover:bg-slate-100"
                  >

                    <Pencil size={16} />

                  </button>

                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="rounded-md border border-gray-200 p-2 text-red-500 transition hover:bg-red-50"
                  >

                    <Trash2 size={16} />

                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </Card>
  );
}

export default TransactionTable;