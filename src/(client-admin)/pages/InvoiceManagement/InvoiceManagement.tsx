/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Search, MoreVertical, Eye, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InvoiceDetailsDialog } from "./_components/InvoiceDetailsDialog";
import { useGetPaymentHistoryQuery } from "@/redux/features/user-admin/invoiceApi";
import { format } from "date-fns";
import { generateInvoicePDF } from "./_components/generateInvoicePDF";

const ClientAdminInvoiceManagement = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    null,
  );

  // API Call - ব্যাকএন্ড ফিল্টার এবং প্যাজিনেশন সহ
  const { data: invoiceResponse} = useGetPaymentHistoryQuery({
    search: search || undefined,
    page: currentPage,
    limit: pageSize,
  });
console.log(invoiceResponse);
  const invoices = invoiceResponse?.data || [];
  const meta = (invoiceResponse as any)?.meta;

  const handleViewDetails = (id: string) => {
    setSelectedInvoiceId(id);
    setIsDetailsOpen(true);
  };

  const columns: Column<any>[] = [
    {
      header: "Invoice",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
            <FileText size={20} />
          </div>
          <span className="font-bold text-slate-900">
            {item.stripeInvoiceId
              ? item.stripeInvoiceId.slice(-8).toUpperCase()
              : `INV-${item.id.slice(0, 5)}`}
          </span>
        </div>
      ),
    },
    {
      header: "Date",
      render: (item) => (
        <span>{format(new Date(item.createdAt), "MMM dd, yyyy")}</span>
      ),
    },
    {
      header: "Subscription",
      render: (item) => (
        <span className="font-medium text-slate-700">
          {item.subscription?.planName}
        </span>
      ),
    },
    {
      header: "Amount",
      render: (item) => (
        <span className="font-bold text-slate-900">${item.amount}</span>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-md text-sm font-bold ${
            item.status === "PAID"
              ? "bg-[#D0FBE2] text-[#10B956]"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <MoreVertical size={18} className="text-slate-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-1" align="end">
            <button
              onClick={() => handleViewDetails(item.id)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 text-slate-700 rounded-md cursor-pointer transition-colors"
            >
              <Eye size={16} className="text-blue-500" /> View Details
            </button>
            <button
              onClick={() => generateInvoicePDF(item)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 text-slate-700 rounded-md cursor-pointer transition-colors"
            >
              <Download size={16} className="text-green-500" /> Download Invoice
            </button>
          </PopoverContent>
        </Popover>
      ),
    },
  ];

  return (
    <div className="p-8 min-h-screen space-y-6 bg-[#F8FAFC]">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
          Billing & Invoices
        </h1>
        <p className="text-slate-500 text-base">
          Manage your subscription transactions and billing history.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // সার্চ করলে প্রথম পেজে নিয়ে যাবে
              }}
              placeholder="Search by plan name or title..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-base outline-none focus:ring-2 focus:ring-[#8C23CC]/20 focus:border-[#8C23CC]"
            />
          </div>
        </div>

        <CommonTable columns={columns} data={invoices}/>

        {meta && (
          <div className="mt-6">
            <CommonPagination
              totalItems={meta.total}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>

      <InvoiceDetailsDialog
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        invoiceId={selectedInvoiceId}
      />
    </div>
  );
};

export default ClientAdminInvoiceManagement;
