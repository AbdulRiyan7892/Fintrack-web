import { FaEdit, FaTrash } from "react-icons/fa";

function TransactionCard({
    transaction,
    onEdit,
    onDelete
}) {

    return (

        <div className="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold text-slate-800">

                        {transaction.title}

                    </h2>

                    <p className="mt-2 text-sm text-slate-500">

                        {transaction.transactionDate}

                    </p>

                </div>

                <div
                  className={`h-3 w-3 rounded-full ${
                    transaction.type === "INCOME"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />

            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">

                <div>

                    <p className="text-sm text-slate-500">

                        Category

                    </p>

                    <p className="font-semibold">

                        {transaction.category}

                    </p>

                </div>

                <div>

                    <p className="text-sm text-slate-500">

                        Payment

                    </p>

                    <p className="font-semibold">

                        {transaction.paymentMethod}

                    </p>

                </div>

            </div>

            <div className="mt-6 flex items-center justify-between">

                <h1
                    className={`text-3xl font-bold ${
                        transaction.type === "INCOME"
                            ? "text-green-600"
                            : "text-red-500"
                    }`}
                >

                    ₹{transaction.amount}

                </h1>

                <div className="flex gap-4">

                    <button
                        onClick={() => onEdit(transaction)}
                        className="rounded-full bg-blue-100 p-3 text-blue-600 transition hover:bg-blue-200"
                    >

                        <FaEdit />

                    </button>

                    <button
                        onClick={() => onDelete(transaction.id)}
                        className="rounded-full bg-red-100 p-3 text-red-600 transition hover:bg-red-200"
                    >

                        <FaTrash />

                    </button>

                </div>

            </div>

        </div>

    );

}

export default TransactionCard;