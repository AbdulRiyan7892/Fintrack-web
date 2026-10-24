import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    createBudget,
    updateBudget
} from "../../api/budgetApi";

function BudgetModal({
    open,
    onClose,
    budget,
    onSuccess
}) {

    const [form, setForm] = useState({

        category: "FOOD",
        budgetAmount: "",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()

    });

    useEffect(() => {

        if (budget) {

            setForm(budget);

        }

    }, [budget]);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (budget) {

                await updateBudget(
                    budget.id,
                    form
                );

                toast.success("Budget Updated");

            } else {

                await createBudget(form);

                toast.success("Budget Added");

            }

            onSuccess();

        }catch (error) {

             console.error(error);

             toast.error(
                 error.response?.data?.message ||
                 "Operation Failed"
             );

         }

    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5">
              <h2 className="text-2xl font-semibold text-slate-900">
                {budget ? "Edit Budget" : "Create Budget"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Set a monthly spending limit for a category.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-slate-700 focus:border-blue-500 focus:outline-none"
              >
                <option value="FOOD">🍔 Food</option>
                <option value="TRAVEL">✈️ Travel</option>
                <option value="SHOPPING">🛍 Shopping</option>
                <option value="FUEL">⛽ Fuel</option>
                <option value="SALARY">💼 Salary</option>
              </select>

              <input
                type="number"
                name="budgetAmount"
                placeholder="Budget Limit"
                value={form.budgetAmount}
                onChange={handleChange}
                required
                  min="1"
                className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 focus:border-blue-500 focus:outline-none"
              />

              <select
                name="month"
                value={form.month}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 focus:border-blue-500 focus:outline-none"
              >
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
              </select>

              <select
                name="year"
                value={form.year}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 focus:border-blue-500 focus:outline-none"
              >
                {[2025, 2026, 2027, 2028, 2029, 2030].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {/* Footer */}
              {/* Changed flex layout here so buttons stack on small screens and go side-by-side on larger ones */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end sm:gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-8 text-base font-semibold text-slate-700 transition hover:bg-gray-100 sm:w-auto sm:min-w-[140px]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-blue-600 px-8 text-base font-semibold text-white transition hover:bg-blue-700 sm:w-auto sm:min-w-[180px]"
                >
                  {budget ? "Update Budget" : "Save Budget"}
                </button>
              </div>
            </form>
          </div>
        </div>
      );

}

export default BudgetModal;