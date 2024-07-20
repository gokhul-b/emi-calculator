"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Slider } from "./ui/slider";
import { EmiInput, EmiMonthDetail } from "@/type";
import { Button } from "./ui/button";
import { emiCalculator } from "@/app/actions";

interface FormInputProps {
  form: EmiInput;
  setForm: Dispatch<SetStateAction<EmiInput>>;
  emi: string;
  setEmi: Dispatch<SetStateAction<string>>;
  totIntPay: string;
  setTotIntPay: Dispatch<SetStateAction<string>>;
  totPay: string;
  setTotPay: Dispatch<SetStateAction<string>>;
  setEmiDetails: Dispatch<SetStateAction<EmiMonthDetail[]>>;
}
const FormInput = ({
  form,
  setForm,
  emi,
  setEmi,
  totIntPay,
  setTotIntPay,
  totPay,
  setTotPay,
  setEmiDetails,
}: FormInputProps) => {

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    console.log(form);
  };
  useEffect(() => {
    handleCalculate();
  }, []);
  const handleCalculate = () => {
    const startDate = new Date();
    const startMonth = startDate.getMonth(); // getMonth() is zero-based, so add 1
    const startYear = startDate.getFullYear();
    const result = emiCalculator(
      form.loanAmount,
      form.interestRate,
      form.loanTenure,
      startMonth,
      startYear
    );
    setEmi(result.EMI);
    setTotIntPay(result["Total Interest Payable"]);
    setTotPay(result["Total Payment"]);
    setEmiDetails(result["EMI Details"]);
    console.log(result["EMI Details"]);
  };
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="font-bold text-sm">Loan Amount (₹)</p>
        <input
          type="text"
          name="loanAmount"
          className="border-none font-extrabold text-2xl px-0 max-w-fit py-0 focus:outline-none"
          value={form.loanAmount.toLocaleString("en-IN")}
          onChange={handleInputChange}
        />
        <Slider
          name="loanAmount"
          max={20000000}
          step={100000}
          min={100000}
          value={[form.loanAmount]}
          onValueChange={([val]) => {
            setForm((prev) => ({ ...prev, loanAmount: val }));
          }}
        />
        <div className="flex justify-between">
          <p className="text-xs text-gray-500">1 lac</p>
          <p className="text-xs text-gray-500">200 lacs</p>
        </div>
      </div>
      <div className="space-y-3">
        <p className="font-bold text-sm">Interest Rate (%)</p>
        <input
          type="number"
          name="interestRate"
          className="border-none font-extrabold text-2xl px-0 max-w-fit py-0 focus:outline-none"
          value={form.interestRate}
          onChange={handleInputChange}
        />
        <Slider
          max={20}
          min={5}
          step={0.25}
          value={[form.interestRate]}
          onValueChange={([val]) => {
            setForm((prev) => ({ ...prev, interestRate: val }));
          }}
        />
        <div className="flex justify-between">
          <p className="text-xs text-gray-500">5%</p>
          <p className="text-xs text-gray-500">20%</p>
        </div>
      </div>
      <div className="space-y-3">
        <p className="font-bold text-sm">Loan Tenure (Yr)</p>
        <div className="flex justify-between items-end">
          <input
            type="number"
            name="loanTenure"
            className="border-none font-extrabold text-2xl px-0 max-w-fit py-0 focus:outline-none"
            value={form.loanTenure}
            onChange={handleInputChange}
          />
          <p className="font-extrabold">{form.loanTenure * 12} months</p>
        </div>
        <Slider
          name="loanTenure"
          min={0.25}
          max={30}
          step={0.25}
          value={[form.loanTenure]}
          onValueChange={([val]) => {
            setForm((prev) => ({ ...prev, loanTenure: val }));
          }}
        />
        <div className="flex justify-between">
          <p className="text-xs text-gray-500">3 mo</p>
          <p className="text-xs text-gray-500">360 mo</p>
        </div>
      </div>
      <div className="w-full flex justify-center pt-4 rounded-full">
        <Button onClick={handleCalculate}>Calculate</Button>
      </div>
    </div>
  );
};

export default FormInput;
