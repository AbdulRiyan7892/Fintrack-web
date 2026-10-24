import StatCard from "../../components/dashboard/StatCard";
import { useEffect, useState } from "react";
import { fetchDashboardData } from "../../services/dashboardService";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaWallet,
  FaBullseye,
} from "react-icons/fa6";
import QuickActions from "../../components/dashboard/QuickAction";
import FinancialHealth from "../../components/dashboard/FinancialHealth";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { getCategoryReport } from "../../api/reportApi";
import { getMonthlyReport } from "../../api/reportApi";
import IncomeExpenseChart from "../../components/charts/IncomeExpenseChart.jsx"
import ExpensePieChart from "../../components/charts/ExpensePieChart.jsx"
import { useNavigate } from "react-router-dom";
function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const navigate = useNavigate();
    const [categoryData,setCategoryData]=useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        loadDashboard();

    }, []);
const today = new Date();

const [selectedMonth, setSelectedMonth] = useState(
    today.getMonth() + 1
);

const [selectedYear, setSelectedYear] = useState(
    today.getFullYear()
);
useEffect(() => {

    loadDashboard();

}, [selectedMonth, selectedYear]);

  const loadDashboard = async () => {

      try {

          setLoading(true);

          const [dashboardResponse, categoryResponse] =
              await Promise.all([

                  getMonthlyReport(
                      selectedMonth,
                      selectedYear
                  ),

                  getCategoryReport(
                      selectedMonth,
                      selectedYear
                  )

              ]);

          setDashboard(dashboardResponse.data.data);

          setCategoryData(categoryResponse.data.data);

      }

      catch (error) {

          console.error(error);

      }

      finally {

          setLoading(false);

      }

  };
if (loading) {

    return (


            <div className="space-y-6">

                <div className="h-10 w-56 animate-pulse rounded bg-gray-200"/>

                <div className="grid grid-cols-4 gap-5">

                    {[1,2,3,4].map(i=>(
                        <div
                            key={i}
                            className="h-36 animate-pulse rounded-xl bg-gray-200"
                        />
                    ))}

                </div>

               <div className="h-80 animate-pulse rounded-xl bg-gray-200" />
                    </div>


    );

}
  return (

     <div className="space-y-8">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

        <div>



          <h1 className="mt-1 text-3xl font-semibold text-slate-900">

            Welcome back,

          </h1>

          <p className="mt-2 text-sm text-slate-500">

            Here's your financial overview for this month.

          </p>

        </div>

        <div className="flex items-center gap-3">



         <Button
           onClick={() => navigate("/transactions?new=true")}
         >
           + Add Transaction
         </Button>

        </div>

      </div>
      <div className="mb-8 flex flex-wrap items-center gap-5">

          <div>

              <label className="mb-1 block text-sm font-medium">
                  Month
              </label>

              <select
                  value={selectedMonth}
                  onChange={(e) =>
                      setSelectedMonth(Number(e.target.value))
                  }
                  className="
                  h-11
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-4
                  text-sm
                  focus:border-blue-500
                  focus:outline-none
                  "
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

          </div>

          <div>

              <label className="mb-1 block text-sm font-medium">
                  Year
              </label>

              <select
                  value={selectedYear}
                  onChange={(e) =>
                      setSelectedYear(Number(e.target.value))
                  }
                  className="
                  h-11
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-4
                  text-sm
                  focus:border-blue-500
                  focus:outline-none
                  "
              >

                  <option>2025</option>
                  <option>2026</option>
                  <option>2027</option>

              </select>

          </div>

      </div>

     <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-2">

        <StatCard
        title="Income"
        value={`₹${dashboard?.totalIncome ?? 0}`}
        subtitle="This month"
        color="text-slate-600"
        icon={<FaArrowTrendUp size={20} />}
        />

        <StatCard
          title="Expense"
          value={`₹${dashboard?.totalExpense ?? 0}`}
          subtitle="This month"
          color="text-slate-600"
          icon={<FaArrowTrendDown size={20} />}
        />

        <StatCard
          title="Savings"
          value={`₹${dashboard?.totalSavings ?? 0}`}
          subtitle="This month"
          color="text-slate-600"
          icon={<FaWallet size={20}  />}
        />

        <StatCard
          title="Daily Expense"

          value={`₹${dashboard?.averageDailyExpense ?? 0}`}
          subtitle="This month"
          color="text-slate-600"
          icon={<FaBullseye size={20}  />}
        />

      </div>
       {/* Recent Transactions */}

       {/* Recent Transactions */}

       <Card className="mt-8">

         <div className="mb-5 flex items-center justify-between">

           <h2 className="text-lg font-semibold text-slate-800">
             Recent Transactions
           </h2>

           <button className="text-sm font-medium text-blue-600 hover:text-blue-700"
            onClick={() => navigate("/transactions?new=true")}>
             View All
           </button>


         </div>

         <div className="overflow-x-auto">

           <table className="w-full text-sm">

             <thead className="bg-slate-50">

               <tr className="border-b border-gray-200 text-left text-slate-500">

                 <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Title</th>

                 <th>Category</th>

                 <th>Amount</th>

                 <th>Type</th>

               </tr>

             </thead>

             <tbody>

               {dashboard.transactions.map((transaction) => (

                 <tr
                   key={transaction.id}
                   className="border-b border-gray-100 transition duration-150 hover:bg-blue-50"
                 >

                   <td className="py-4 font-medium text-slate-700">
                     {transaction.title}
                   </td>

                   <td>

                     <span className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium">

                       {transaction.category}

                     </span>

                   </td>

                   <td className="font-semibold">

                     ₹{transaction.amount}

                   </td>

                   <td>

                     <span
                       className={`rounded-md px-3 py-1 text-xs font-semibold ${
                         transaction.type === "INCOME"
                           ? "bg-green-100 text-green-700"
                           : "bg-red-100 text-red-600"
                       }`}
                     >

                       {transaction.type}

                     </span>

                   </td>

                 </tr>

               ))}

             </tbody>

           </table>

         </div>

       </Card>

       {/* Bottom Summary */}

       <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-3">

         <Card className="h-full">

         <p className="text-sm text-slate-500">

         Top Expense Category

         </p>

         <h2 className="mt-3 text-3xl font-semibold text-red-500">

         {dashboard.topExpenseCategory}

         </h2>

         </Card>
{/*         <Card className="h-full"> */}

{/*          <p className="text-sm text-slate-500"> */}

{/*          FinancialHealth */}

{/*          </p> */}

{/*          <h2 className="mt-3 text-3xl font-semibold text-blue-600"> */}

{/*          Income={dashboard.totalIncome} */}

{/*            Expense={dashboard.totalExpense} */}

{/*            Savings={dashboard.totalSavings} */}

{/*          </h2> */}

{/*          </Card> */}

         <Card className="h-full">

         <p className="text-sm text-slate-500">

         Preferred Payment Method

         </p>

         <h2 className="mt-3 text-3xl font-semibold text-blue-600">

         {dashboard.topPaymentMethod}

         </h2>

         </Card>

       </div>

       {/* Charts */}

       <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-3">

         <Card className="xl:col-span-2">

         <h2 className="mb-1 text-lg font-semibold text-slate-800">
        <p className="mb-5 text-sm text-slate-500">
            Monthly overview
        </p>
         Income vs Expense

         </h2>

         {
         dashboard && (
         <IncomeExpenseChart report={dashboard}/>
         )
         }

         </Card>

         <QuickActions/>

       </div>

    </div>

  );
}

export default Dashboard;