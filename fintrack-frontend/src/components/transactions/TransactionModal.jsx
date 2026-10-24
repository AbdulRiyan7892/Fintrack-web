import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createTransaction,
  updateTransaction,
} from "../../api/transactionApi";

function TransactionModal({
  open,
  onClose,
  transaction,
  onSuccess,
}) {
  const emptyForm = {
    title: "",
    amount: "",
    category: "FOOD",
    paymentMethod: "CASH",
    type: "EXPENSE",
    transactionDate: "",
    description: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (transaction) {
      setForm({
        title: transaction.title || "",
        amount: transaction.amount || "",
        category: transaction.category || "FOOD",
        paymentMethod:
          transaction.paymentMethod || "CASH",
        type: transaction.type || "EXPENSE",
        transactionDate:
          transaction.transactionDate || "",
        description:
          transaction.description || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [transaction]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (transaction) {
        await updateTransaction(transaction.id, form);
        toast.success("Transaction Updated");
      } else {
        await createTransaction(form);
        toast.success("Transaction Added");
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Operation Failed");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50">

      <div className="flex h-screen items-center justify-center p-3 sm:p-5">

        <div className="flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

          {/* Header */}

          <div className="flex items-center justify-between border-b px-6 py-5">

            <h2 className="text-2xl font-semibold text-slate-800">
              {transaction
                ? "Edit Transaction"
                : "Add Transaction"}
            </h2>

            <button
              onClick={onClose}
              className="text-2xl text-slate-400 hover:text-red-500"
            >
              ×
            </button>

          </div>

          {/* Scrollable Form */}

          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto px-6 py-6"
          >

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Title
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Salary / Grocery"
                  className="h-11 w-full rounded-lg border border-gray-300 px-4"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Amount
                </label>

                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-300 px-4"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-300 px-4"
                >
                  <option>FOOD</option>
                  <option>TRAVEL</option>
                  <option>SHOPPING</option>
                  <option>FUEL</option>
                  <option>SALARY</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Payment Method
                </label>

                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-300 px-4"
                >
                  <option>CASH</option>
                  <option>UPI</option>
                  <option>CREDIT_CARD</option>
                  <option>DEBIT_CARD</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Transaction Type
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-300 px-4"
                >
                  <option>INCOME</option>
                  <option>EXPENSE</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Date
                </label>

                <input
                  type="date"
                  name="transactionDate"
                  value={form.transactionDate}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-300 px-4"
                />
              </div>

              <div className="lg:col-span-2">

                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  rows={5}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-4"
                />

              </div>

            </div>

          </form>

          {/* Footer */}

         <div className="flex justify-end gap-4 border-t bg-gray-50 px-6 py-5">

           <button
             type="button"
             onClick={onClose}
             className="h-12 min-w-[140px] rounded-lg border border-gray-300 bg-white px-8 text-base font-semibold text-slate-700 transition-all duration-200 hover:bg-gray-100"
           >
             Cancel
           </button>

           <button
             type="submit"
             onClick={handleSubmit}
             className="h-12 min-w-[180px] rounded-lg bg-blue-600 px-8 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700"
           >
             {transaction
               ? "Update Transaction"
               : "Save Transaction"}
           </button>

         </div>

        </div>

      </div>

    </div>
  );
}

export default TransactionModal;