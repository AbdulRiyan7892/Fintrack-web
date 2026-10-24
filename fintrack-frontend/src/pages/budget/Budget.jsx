import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/ui/PageHeader";
import BudgetCard from "../../components/budget/BudgetCard";
import BudgetModal from "../../components/budget/BudgetModal";

import {
    getBudgets,
    deleteBudget
} from "../../api/budgetApi";

function Budget() {

    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [openModal, setOpenModal] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState(null);
    useEffect(() => {

        if (searchParams.get("new")) {

            setSelectedBudget(null);

            setOpenModal(true);

        }

    }, []);
    useEffect(() => {

        loadBudgets();

    }, []);

    const loadBudgets = async () => {

        try {

           const response = await getBudgets();

           console.log(response.data);

           setBudgets(response.data);
        } catch (error) {

            console.error(error);

            toast.error("Failed to load budgets");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this budget?")) {

            return;

        }

        try {

            await deleteBudget(id);

            toast.success("Budget deleted successfully");

            loadBudgets();

        } catch (error) {

            console.error(error);

            toast.error("Delete failed");

        }

    };

    if (loading) {

        return (



                <div className="space-y-6">
                    <div className="h-10 w-56 animate-pulse rounded bg-gray-200" />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        {[1,2,3].map((i)=>(
                            <div
                                key={i}
                                className="h-52 animate-pulse rounded-xl bg-gray-200"
                            />
                        ))}
                    </div>
                </div>



        );

    }

    return (

            <div className="space-y-7">

            {/* Header */}
<PageHeader
    title="Budget Management"
    subtitle="Plan and monitor your monthly spending."
>
    <Button
        onClick={() => {
            setSelectedBudget(null);
            setOpenModal(true);
        }}
    >
        + Create Budget
    </Button>
</PageHeader>



            {/* Budget Cards */}

            {

                budgets.length === 0 ? (

                        <Card className="py-16 text-center">


                       <h2 className="text-xl font-semibold text-slate-700">
                           No budgets created
                       </h2>

                       <p className="mt-2 text-sm text-slate-500">
                           Create your first monthly budget to start tracking your spending.
                       </p>

                       <div className="mt-6">
                           <Button
                               onClick={() => {
                                   setSelectedBudget(null);
                                   setOpenModal(true);
                               }}
                           >
                               Create Budget
                           </Button>
                       </div>

                    </Card>

                ) : (

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {

                            budgets.map((budget) => (

                                <BudgetCard
                                    key={budget.id}
                                    budget={budget}
                                    onEdit={(budget) => {

                                        setSelectedBudget(budget);

                                        setOpenModal(true);

                                    }}
                                    onDelete={handleDelete}
                                />

                            ))

                        }

                    </div>

                )

            }

            {/* Add/Edit Modal */}

            <BudgetModal
                open={openModal}
                budget={selectedBudget}
                onClose={() => {

                    setOpenModal(false);

                    setSelectedBudget(null);

                }}
                onSuccess={() => {

                    loadBudgets();

                    setOpenModal(false);

                    setSelectedBudget(null);

                }}
            />


</div>
    );

}

export default Budget;