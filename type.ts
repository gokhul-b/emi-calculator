export interface EmiInput {
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
}

export interface EmiMonthDetail {
  month: number;
  currentMonthIndex: number;
  currentMonthName: string;
  currentYear: number;
  principal: string;
  interest: string;
  totalPayment: string;
  balance: string;
  loanPaidToDate: string;
}

export interface PdfData {
  formData: EmiInput;
  emi: string;
  totIntPay: string;
  totPay: string;
  tableId: "emi-table" | string;
}
