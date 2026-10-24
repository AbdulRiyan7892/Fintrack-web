import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";


import { useSearchParams } from "react-router-dom";
import TransactionFilter from "../../components/transactions/TransactionFilter";
import TransactionTable from "../../components/transactions/TransactionTable";
import TransactionCard from "../../components/transactions/TransactionCard";
import TransactionModal from "../../components/transactions/TransactionModal";

import {
    getTransactions,
    deleteTransaction
} from "../../api/transactionApi";

function Transactions() {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [openModal, setOpenModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [defaultType, setDefaultType] = useState("EXPENSE");
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [searchParams] = useSearchParams();
   useEffect(() => {
       const action = searchParams.get("new");

       if (action === "income") {
           setSelectedTransaction(null);
           setDefaultType("INCOME");
           setOpenModal(true);
       }

       if (action === "expense") {
           setSelectedTransaction(null);
           setDefaultType("EXPENSE");
           setOpenModal(true);
       }
   }, []);
    useEffect(() => {
        loadTransactions();
    }, []);
useEffect(() => {
  console.log("openModal changed:", openModal);
}, [openModal]);
    const loadTransactions = async () => {

        try {

            const response = await getTransactions();

            setTransactions(response.data.data.content);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load transactions");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this transaction?")) {
            return;
        }

        try {

            await deleteTransaction(id);

            toast.success("Transaction deleted successfully");

            loadTransactions();

        } catch (error) {

            console.error(error);

            toast.error("Delete failed");

        }

    };

    const filteredTransactions = transactions.filter((transaction) => {

        const matchesSearch =
            transaction.title
                ?.toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            categoryFilter === "" ||
            transaction.category === categoryFilter;

        const matchesType =
            typeFilter === "" ||
            transaction.type === typeFilter;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesType
        );

    });

    if (loading) {

        return (



               <div className="space-y-6">

               <div className="h-10 w-56 animate-pulse rounded bg-gray-200"/>

               <div className="h-20 animate-pulse rounded-xl bg-gray-200"/>

               <div className="h-96 animate-pulse rounded-xl bg-gray-200"/>

               </div>



        );

    }

    return (

        <div className="space-y-7">

            {/* Header */}

           <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

               <div>

                   <p className="text-sm font-medium text-blue-600">

                       Transactions

                   </p>

                   <h1 className="mt-1 text-3xl font-semibold text-slate-900">

                       Manage Transactions

                   </h1>

                   <p className="mt-2 text-sm text-slate-500">

                       Track, edit and organize your income and expenses.

                   </p>

               </div>

               <Button
                   onClick={()=>{
                       setSelectedTransaction(null);
                       setOpenModal(true);
                   }}
               >

                   + Add Transaction

               </Button>



           </div>

            {/* Filters */}

            <Card className="mb-7">

                <TransactionFilter
                    search={search}
                    setSearch={setSearch}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                />

            </Card>
            {/* Empty State */}

            {filteredTransactions.length === 0 ? (

               <Card className="py-16 text-center">

                    <h2 className="text-2xl font-semibold text-slate-600">

                       No transactions available

                    </h2>

                    <p className="mt-3 text-slate-400">

                        Start by adding your first income or expense.

                    </p>

                </Card>

            ) : (

                <>

                    {/* Desktop Table */}
                     <Card>
                    <div className="hidden lg:block">

                        <TransactionTable
                            transactions={filteredTransactions}
                            onEdit={(transaction) => {

                                setSelectedTransaction(transaction);

                                setOpenModal(true);

                            }}
                            onDelete={handleDelete}
                        />

                    </div>

                    </Card>

                    {/* Mobile Cards */}

                    <div className="grid gap-4 lg:hidden">

                        {filteredTransactions.map((transaction) => (

                            <TransactionCard
                                key={transaction.id}
                                transaction={transaction}
                                onEdit={(transaction) => {

                                    setSelectedTransaction(transaction);

                                    setOpenModal(true);

                                }}
                                onDelete={handleDelete}
                            />

                        ))}

                    </div>

                </>

            )}

            {/* Add/Edit Modal */}

            <TransactionModal
                open={openModal}
                transaction={selectedTransaction}
                onClose={() => {

                    setOpenModal(false);

                    setSelectedTransaction(null);

                }}
                onSuccess={() => {

                    loadTransactions();

                    setOpenModal(false);

                    setSelectedTransaction(null);

                }}
            />
        <button

        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg lg:hidden"

        onClick={()=>{
        setSelectedTransaction(null);
        setOpenModal(true);
        }}

        >

        +

        </button>

</div>
    );

}

export default Transactions;