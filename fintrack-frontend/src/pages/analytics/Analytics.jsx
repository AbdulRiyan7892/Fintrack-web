import { useEffect, useState } from "react";
import CategoryPieChart from "../../components/analytics/CategoryPieChart";

import {

    getCategoryAnalytics
} from "../../api/analyticsApi";
import PaymentBarChart from "../../components/analytics/PaymentBarChart";
import SavingsAreaChart
from "../../components/analytics/SavingsAreaChart";
import {

    getPaymentAnalytics
} from "../../api/analyticsApi";
import AnalyticsSummary from "../../components/analytics/AnalyticsSummary";
import TrendChart from "../../components/analytics/TrendChart";
import { getTrend } from "../../api/analyticsApi";

function Analytics() {

    const today = new Date();

    const [month] = useState(today.getMonth() + 1);
    const [categoryData, setCategoryData] = useState([]);
    const [year, setYear] = useState(today.getFullYear());
    const [paymentData,setPaymentData]=useState([]);
   const [trend, setTrend] = useState([]);
   const [summary, setSummary] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadAnalytics();

    }, [year]);

    const loadAnalytics = async () => {

        try {

            const response = await getTrend(year);

            const data = response.data.data;

            setTrend(data);
            const categoryResponse =
            await getCategoryAnalytics(year);

            setCategoryData(
                categoryResponse.data.data
            );

            const totalIncome = data.reduce(
                (sum, item) => sum + Number(item.income),
                0
            );

            const totalExpense = data.reduce(
                (sum, item) => sum + Number(item.expense),
                0
            );
        const paymentResponse =
        await getPaymentAnalytics(year);

        setPaymentData(
            paymentResponse.data.data
        );

            const totalSavings = data.reduce(
                (sum, item) => sum + Number(item.savings),
                0
            );

            const budgetUsed =
                totalIncome > 0
                    ? ((totalExpense / totalIncome) * 100).toFixed(1)
                    : 0;

            setSummary({

                totalIncome,

                totalExpense,

                totalSavings,

                budgetUsed

            });

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    return (


        <div className="space-y-7">
           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

               <div>

                   <p className="text-sm font-medium text-blue-600">

                       Analytics

                   </p>

                   <h1 className="mt-1 text-3xl font-semibold text-slate-900">

                       Financial Analytics

                   </h1>

                   <p className="mt-2 text-sm text-slate-500">

                       Visualize your income, expenses and financial trends.

                   </p>

               </div>

               <select
                   value={year}
                   onChange={(e)=>setYear(Number(e.target.value))}
                   className="h-11 rounded-lg border border-gray-300 bg-white px-4"
               >

                   {[2025,2026,2027,2028,2029].map(y=>(

                       <option
                           key={y}
                           value={y}
                       >

                           {y}

                       </option>

                   ))}

               </select>

           </div>

            {

                loading ? (

                    <div className="flex h-60 items-center justify-center">

                        <h2 className="text-xl font-semibold">

                           <div className="space-y-6">

                               <div className="h-10 w-64 animate-pulse rounded bg-gray-200"/>

                               <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

                                   {[1,2,3,4].map(i=>(

                                       <div
                                           key={i}
                                           className="h-32 animate-pulse rounded-xl bg-gray-200"
                                       />

                                   ))}

                               </div>

                           </div>

                        </h2>

                    </div>

                ) : (

                 <>

                     <AnalyticsSummary report={summary} />

                     <div className="mt-10">

                         <TrendChart
                             data={trend}
                         />

                     </div>
                    <div className="grid gap-5 xl:grid-cols-2">

                    <CategoryPieChart
                    data={categoryData}
                    />

                    <PaymentBarChart
                    data={paymentData}
                    />

                    </div>
                     <div className="mt-10">

                         <SavingsAreaChart
                             data={trend}
                         />

                     </div>

                 </>

                )

            }

      </div>

    );

}

export default Analytics;