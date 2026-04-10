/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

export const generateInvoicePDF = (invoice: any) => {
  const doc = new jsPDF();
  const date = format(new Date(invoice.createdAt), "dd MMM, yyyy");
  const invoiceId = invoice.stripeInvoiceId || `INV-${invoice.id.slice(0, 8)}`;

  // --- Header ---
  doc.setFontSize(20);
  doc.setTextColor(140, 35, 204); 
  doc.text("INVOICE", 14, 22);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Invoice No: ${invoiceId}`, 14, 30);
  doc.text(`Date: ${date}`, 14, 35);

  // --- Company Details ---
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("Billed To:", 14, 50);
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text(`${invoice.tenant?.companyName || "N/A"}`, 14, 56);
  doc.text(`${invoice.tenant?.companyEmail || "N/A"}`, 14, 61);

  // --- Table ---
  autoTable(doc, {
    startY: 75,
    head: [["Description", "Billing Cycle", "Status", "Total"]],
    body: [
      [
        invoice.subscription?.planName || "Subscription Plan",
        invoice.subscription?.billingCycle || "N/A",
        invoice.status,
        `$${invoice.amount}`,
      ],
    ],
    headStyles: { fillColor: [140, 35, 204] }, 
    styles: { fontSize: 10, cellPadding: 5 },
  });

  // --- Summary ---
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Total Paid: $${invoice.amount}`, 140, finalY);

  // --- Footer ---
  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text("Thank you for your business!", 14, 280);

  // Save PDF
  doc.save(`${invoiceId}.pdf`);
};
