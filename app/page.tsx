"use client";
import { DataTable } from "@/components/DataTable";
import { EmiColumn } from "@/components/EmiColumn";
import FormInput from "@/components/FormInput";
import ResultComponent from "@/components/ResultComponent";
import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { EmiInput, EmiMonthDetail, PdfData } from "@/type";
import { useState } from "react";
import { downloadPDF } from "./actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePickerForm } from "@/components/DatePickerForm";

export default function Home() {
  const [emi, setEmi] = useState<string>("");
  const FormInputInitialState: EmiInput = {
    loanAmount: 5000000,
    interestRate: 9,
    loanTenure: 5,
  };

  const [form, setForm] = useState<EmiInput>(FormInputInitialState);
  const [totIntPay, setTotIntPay] = useState<string>("");
  const [totPay, setTotPay] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [emiDetails, setEmiDetails] = useState<EmiMonthDetail[]>([]);

  const pdfData: PdfData = {
    formData: form,
    emi: emi,
    totIntPay: totIntPay,
    totPay: totPay,
    tableId: "emi-table",
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadPDF(pdfData);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  };

  // const handleDownloadAndSendPDF = async () => {
  //   const pdfBlob = await downloadPDF(pdfData);
  //   if (pdfBlob) {
  //     await sendPDFToServer(pdfBlob);
  //   }
  // };

  return (
    <div className="space-y-12">
      <p className="font-extrabold text-2xl">EMI Calculator</p>
      <div className="flex w-full justify-between">
        <div className="w-1/2">
          <FormInput
            form={form}
            setForm={setForm}
            emi={emi}
            setEmi={setEmi}
            totIntPay={totIntPay}
            setTotIntPay={setTotIntPay}
            totPay={totPay}
            setTotPay={setTotPay}
            setEmiDetails={setEmiDetails}
          />
        </div>
        <div className="w-2/5">
          <ResultComponent emi={emi} totIntPay={totIntPay} totPay={totPay} />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-4/5">
          <div className="flex items-end justify-between mb-8">
            <p className="font-extrabold text-xl">Month-wise EMI Payments</p>
            <div className="flex space-x-8">
              <DatePickerForm
                loanAmount={form.loanAmount}
                interestRate={form.interestRate}
                loanTenure={form.loanTenure}
                setEmiDetails={setEmiDetails}
              />
              <div className="flex justify-end">
                <Button
                  className="max-w-sm bg-[#0088FE]  hover:bg-[#8fc2ef]  "
                  onClick={handleDownload}
                >
                  {isDownloading ? "Downloading" : "Download PDF"}
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <ScrollArea className="h-[540px] border rounded-md">
              <DataTable columns={EmiColumn} data={emiDetails} />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
