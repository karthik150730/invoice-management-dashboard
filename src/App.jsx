import { useState } from "react";

function App() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");



  const invoices = [
    { id: "INV-001", customer: "John Doe", amount: 1200, status: "Paid" },
    { id: "INV-002", customer: "Jane Smith", amount: 800, status: "Pending" },
    { id: "INV-003", customer: "Alex Brown", amount: 450, status: "Overdue" },
    { id: "INV-004", customer: "Chris Green", amount: 600, status: "Paid" },
  ];

  const statusColor = (status) => {
    if (status === "Paid") return "text-green-600";
    if (status === "Pending") return "text-yellow-600";
    if (status === "Overdue") return "text-red-600";
    return "";
  };

  const filteredInvoices = invoices.filter((inv) => {
  const matchesStatus = filter === "All" || inv.status === filter;
  const matchesSearch =
    inv.id.toLowerCase().includes(search.toLowerCase()) ||
    inv.customer.toLowerCase().includes(search.toLowerCase());

  return matchesStatus && matchesSearch;
})
.sort((a, b) => {
    if (sortOrder === "asc") return a.amount - b.amount;
    if (sortOrder === "desc") return b.amount - a.amount;
    return 0;
  });


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        Invoice Management Dashboard
      </h1>

      {/* Filter Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
  value={sortOrder}
  onChange={(e) => setSortOrder(e.target.value)}
  className="px-4 py-2 border rounded w-full sm:w-56"
>
  <option value="">Sort by Amount</option>
  <option value="asc">Amount: Low → High</option>
  <option value="desc">Amount: High → Low</option>
</select>

  {/* Search */}
  <input
    type="text"
    placeholder="Search by Invoice ID or Customer"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="px-4 py-2 border rounded w-full sm:w-80"
  />

  {/* Filter Buttons */}
  <div className="flex gap-3">
    {["All", "Paid", "Pending", "Overdue"].map((s) => (
      <button
        key={s}
        onClick={() => setFilter(s)}
        className={`px-4 py-2 rounded border ${
          filter === s
            ? "bg-black text-white"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        {s}
      </button>
    ))}
  </div>
</div>


      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-gray-600">Total Invoices</p>
          <p className="text-2xl font-bold">24</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-gray-600">Paid</p>
          <p className="text-2xl font-bold">14</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-gray-600">Pending</p>
          <p className="text-2xl font-bold">6</p>
        </div>

        <div className="bg-red-100 p-4 rounded shadow">
          <p className="text-gray-600">Overdue</p>
          <p className="text-2xl font-bold">4</p>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Invoices</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Invoice ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b">
                <td className="py-2">{invoice.id}</td>
                <td className="py-2">{invoice.customer}</td>
                <td className="py-2">₹{invoice.amount}</td>
                <td
                  className={`py-2 font-semibold ${statusColor(
                    invoice.status
                  )}`}
                >
                  {invoice.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
