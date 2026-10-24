function TransactionFilter({
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    typeFilter,
    setTypeFilter
}) {

    return (

        <div className="mb-6 grid grid-cols-1 gap-4 rounded-3xl bg-white p-6 shadow-lg md:grid-cols-3">

            {/* Search */}

            <input
                type="text"
                placeholder="🔍 Search transaction..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
            />

            {/* Category */}

            <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
            >

                <option value="">All Categories</option>

                <option value="FOOD">🍔 Food</option>

                <option value="TRAVEL">✈ Travel</option>

                <option value="SHOPPING">🛍 Shopping</option>

                <option value="FUEL">⛽ Fuel</option>

                <option value="SALARY">💰 Salary</option>

            </select>

            {/* Type */}

            <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
            >

                <option value="">All Types</option>

                <option value="INCOME">🟢 Income</option>

                <option value="EXPENSE">🔴 Expense</option>

            </select>

        </div>

    );

}

export default TransactionFilter;