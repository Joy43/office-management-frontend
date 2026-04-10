/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Download, Printer } from "lucide-react";
import { useGetInvoiceDetailsQuery } from "@/redux/features/user-admin/invoiceApi";
import { format } from "date-fns";
import { generateInvoicePDF } from "./generateInvoicePDF";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  invoiceId: string | null;
}

export const InvoiceDetailsDialog = ({ isOpen, onClose, invoiceId }: Props) => {
  const { data: response, isLoading } = useGetInvoiceDetailsQuery(
    invoiceId as string,
    {
      skip: !invoiceId,
    },
  );

  const invoice = response?.data;

  if (!invoice && !isLoading) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none rounded-2xl shadow-2xl">
        <div className="p-6 border-b relative bg-slate-50/80">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">
              Transaction Details
            </DialogTitle>
          </DialogHeader>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {isLoading ? (
          <div className="p-20 text-center font-bold text-[#8C23CC]">
            Loading Details...
          </div>
        ) : (
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">
                  Stripe Invoice ID
                </p>
                <h2 className="text-lg font-bold text-slate-900">
                  {invoice?.stripeInvoiceId || "N/A"}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">
                  Status
                </p>
                <span
                  className={`inline-block px-4 py-1 rounded-full text-xs font-bold ${
                    invoice?.status === "PAID"
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {invoice?.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-8 gap-x-4 py-6 border-y border-slate-100">
              <div>
                <p className="text-sm text-slate-400 font-bold mb-1">
                  Billing Date
                </p>
                <p className="text-base font-semibold text-slate-700">
                  {invoice?.createdAt
                    ? format(new Date(invoice.createdAt), "MMMM dd, yyyy")
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400 font-bold mb-1">
                  Subscription Plan
                </p>
                <p className="text-base font-semibold text-slate-700">
                  {invoice?.subscription?.planName}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400 font-bold mb-1">
                  Total Amount Paid
                </p>
                <p className="text-xl font-extrabold text-[#8C23CC]">
                  {invoice?.currency === "usd" ? "$" : ""}
                  {invoice?.amount} {invoice?.currency?.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400 font-bold mb-1">Company</p>
                <p className="text-base font-semibold text-slate-700">
                  {invoice?.tenant?.companyName}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase mb-2">
                Billing Email
              </p>
              <p className="text-sm font-medium text-slate-700">
                {invoice?.tenant?.companyEmail}
              </p>
            </div>

            <div className="flex justify-between gap-4 pt-4">
              <Button
                variant="outline"
                className="flex-1 gap-2 h-12 cursor-pointer border-slate-200"
              >
                <Printer size={18} /> Print
              </Button>
              <Button
                onClick={() => generateInvoicePDF(invoice)}
                className="flex-1 bg-[#8C23CC] hover:bg-[#761eb0] text-white gap-2 h-12 cursor-pointer font-bold shadow-lg shadow-purple-100"
              >
                <Download size={18} /> Download PDF
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
