"use client";

import { EmiMonthDetail } from "@/type";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

export const EmiColumn: ColumnDef<EmiMonthDetail>[] = [
  {
    accessorKey: "currentMonthName",
    header: "Month",
    cell: ({ row }) => {
      const month: string = row.getValue("currentMonthName");
      return (
        <div>
          <p>{month}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "principal",
    header: "Principal (A)",
    cell: ({ row }) => {
      const invest: string = row.getValue("principal");
      return <div>₹ {parseInt(invest).toLocaleString("en-IN")}</div>;
    },
  },
  {
    accessorKey: "interest",
    header: "Interest (B)",
    cell: ({ row }) => {
      const invest: string = row.getValue("interest");
      return <div>₹ {parseInt(invest).toLocaleString("en-IN")}</div>;
    },
  },
  {
    accessorKey: "totalPayment",
    header: "Total Payment (A + B)",
    cell: ({ row }) => {
      const invest: string = row.getValue("totalPayment");
      return <div>₹ {parseInt(invest).toLocaleString("en-IN")}</div>;
    },
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      const invest: string = row.getValue("balance");
      return <div>₹ {parseInt(invest).toLocaleString("en-IN")}</div>;
    },
  },
  {
    accessorKey: "loanPaidToDate",
    header: "Loan Paid To Date",
  },
];
