import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PdfData } from "@/type";
import { fontWeight } from "html2canvas/dist/types/css/property-descriptors/font-weight";
const timesNewRomanFont = "data:font/truetype;charset=utf-8;base64,AAEAAA...";

// import { generatePDFBlob } from "./path-to-your-pdf-function";

// export const sendPDFToServer = async (pdfBlob: Blob) => {
//   const formData = new FormData();
//   formData.append("pdf", pdfBlob, "emi-details.pdf");

//   const response = await fetch("/api/send-pdf", {
//     method: "POST",
//     body: formData,
//   });

//   if (!response.ok) {
//     console.error("Failed to send PDF to server");
//   } else {
//     console.log("PDF sent successfully");
//   }
// };

// export const generatePDFBlob = async (
//   pdfData: PdfData
// ): Promise<Blob | null> => {
//   const input = document.getElementById(pdfData.tableId);

//   if (!input) {
//     console.error(`Element with id "${pdfData.tableId}" not found.`);
//     return null;
//   }

//   const pdf = new jsPDF("p", "mm", "a4");
//   const margin = 10;
//   const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
//   const pageHeight = pdf.internal.pageSize.getHeight() - margin * 2;

//   // Add custom font
//   pdf.addFileToVFS("TimesNewRoman.ttf", timesNewRomanFont);
//   pdf.addFont("TimesNewRoman.ttf", "TimesNewRoman", "normal");
//   pdf.setFont("TimesNewRoman");

//   // Add additional details to the first page
//   pdf.setFont("TimesNewRoman", "normal", 500);
//   pdf.setFontSize(16);
//   pdf.text("EMI Details Report", margin, margin + 10);

//   pdf.setFontSize(8);
//   pdf.setTextColor("#6b7280");
//   pdf.text(
//     "Generated on: " + new Date().toLocaleDateString(),
//     margin,
//     margin + 15
//   );

//   pdf.setFontSize(12);
//   pdf.text("Loan Amount: ", margin, margin + 30);
//   pdf.setTextColor("#111827");
//   pdf.setFontSize(14);
//   pdf.text(
//     `${pdfData.formData.loanAmount.toLocaleString("en-IN")} rs`,
//     margin + 30,
//     margin + 30
//   );

//   pdf.setTextColor("#6b7280");
//   pdf.setFontSize(12);
//   pdf.text("Interest Rate: ", margin, margin + 40);
//   pdf.setTextColor("#111827");
//   pdf.setFontSize(14);
//   pdf.text(
//     `${pdfData.formData.interestRate.toLocaleString("en-IN")} %`,
//     margin + 30,
//     margin + 40
//   );

//   pdf.setTextColor("#6b7280");
//   pdf.setFontSize(12);
//   pdf.text("Loan Tenure: ", margin, margin + 50);
//   pdf.setTextColor("#111827");
//   pdf.setFontSize(14);
//   pdf.text(
//     `${pdfData.formData.loanTenure.toLocaleString("en-IN")} Yrs / ${
//       pdfData.formData.loanTenure * 12
//     } Mo`,
//     margin + 30,
//     margin + 50
//   );

//   pdf.setTextColor("#6b7280");
//   pdf.setFontSize(12);
//   pdf.text("Loan Emi: ", margin + 70, margin + 30);
//   pdf.setTextColor("#111827");
//   pdf.setFontSize(14);
//   pdf.text(
//     `${parseInt(pdfData.emi).toLocaleString("en-IN")} rs`,
//     margin + 135,
//     margin + 30
//   );

//   pdf.setTextColor("#6b7280");
//   pdf.setFontSize(12);
//   pdf.text("Total Interest Payable: ", margin + 70, margin + 40);
//   pdf.setTextColor("#111827");
//   pdf.setFontSize(14);
//   pdf.text(
//     `${parseInt(pdfData.totIntPay).toLocaleString("en-IN")} rs`,
//     margin + 135,
//     margin + 40
//   );

//   pdf.setTextColor("#6b7280");
//   pdf.setFontSize(12);
//   pdf.text("Total Payment (Principal + Interest): ", margin + 70, margin + 50);
//   pdf.setTextColor("#111827");
//   pdf.setFontSize(14);
//   pdf.text(
//     `${parseInt(pdfData.totPay).toLocaleString("en-IN")} rs`,
//     margin + 135,
//     margin + 50
//   );

//   pdf.setFontSize(16);
//   pdf.text("Month-wise EMI Payments", margin, margin + 70);

//   const canvas = await html2canvas(input);
//   const imgData = canvas.toDataURL("image/png");
//   const imgWidth = pageWidth;
//   const imgHeight = (canvas.height * imgWidth) / canvas.width;

//   let position = margin + 80;

//   pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);

//   let heightLeft = imgHeight + position + margin - pageHeight;

//   while (heightLeft > 0) {
//     pdf.addPage();
//     position = margin;
//     pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
//     heightLeft -= pageHeight;
//   }

//   // Convert PDF to Blob
//   const pdfBlob = pdf.output("blob");

//   return pdfBlob;
// };

export const downloadPDF = async (pdfData: PdfData) => {
  const input = document.getElementById(pdfData.tableId);

  if (!input) {
    console.error(`Element with id "${pdfData.tableId}" not found.`);
    return;
  }

  const pdf = new jsPDF("p", "mm", "a4");
  const margin = 10; // Margin in mm
  const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
  const pageHeight = pdf.internal.pageSize.getHeight() - margin * 2;

  // Add custom font
  pdf.addFileToVFS("TimesNewRoman.ttf", timesNewRomanFont);
  pdf.addFont("TimesNewRoman.ttf", "TimesNewRoman", "normal");
  pdf.setFont("TimesNewRoman");

  // Add additional details to the first page
  pdf.setFont("TimesNewRoman", "normal", 500);
  pdf.setFontSize(16);
  pdf.text("EMI Details Report", margin, margin + 10);

  pdf.setFontSize(8);
  pdf.setTextColor("#6b7280");
  pdf.text(
    "Generated on: " + new Date().toLocaleDateString(),
    margin,
    margin + 15
  );

  pdf.setFontSize(12);
  pdf.text("Loan Amount: ", margin, margin + 30);
  pdf.setTextColor("#111827");
  pdf.setFontSize(14);
  pdf.text(
    `${pdfData.formData.loanAmount.toLocaleString("en-IN")} rs`,
    margin + 30,
    margin + 30
  );

  pdf.setTextColor("#6b7280");
  pdf.setFontSize(12);
  pdf.text("Interest Rate: ", margin, margin + 40);
  pdf.setTextColor("#111827");
  pdf.setFontSize(14);
  pdf.text(
    `${pdfData.formData.interestRate.toLocaleString("en-IN")} %`,
    margin + 30,
    margin + 40
  );

  pdf.setTextColor("#6b7280");
  pdf.setFontSize(12);
  pdf.text("Loan Tenure: ", margin, margin + 50);
  pdf.setTextColor("#111827");
  pdf.setFontSize(14);
  pdf.text(
    `${pdfData.formData.loanTenure.toLocaleString("en-IN")} Yrs / ${
      pdfData.formData.loanTenure * 12
    } Mo`,
    margin + 30,
    margin + 50
  );

  pdf.setTextColor("#6b7280");
  pdf.setFontSize(12);
  pdf.text("Loan Emi: ", margin + 70, margin + 30);
  pdf.setTextColor("#111827");
  pdf.setFontSize(14);
  pdf.text(
    `${parseInt(pdfData.emi).toLocaleString("en-IN")} rs`,
    margin + 137,
    margin + 30
  );

  pdf.setTextColor("#6b7280");
  pdf.setFontSize(12);
  pdf.text("Total Interest Payable: ", margin + 70, margin + 40);
  pdf.setTextColor("#111827");
  pdf.setFontSize(14);
  pdf.text(
    `${parseInt(pdfData.totIntPay).toLocaleString("en-IN")} rs`,
    margin + 137,
    margin + 40
  );

  pdf.setTextColor("#6b7280");
  pdf.setFontSize(12);
  pdf.text("Total Payment (Principal + Interest): ", margin + 70, margin + 50);
  pdf.setTextColor("#111827");
  pdf.setFontSize(14);
  pdf.text(
    `${parseInt(pdfData.totPay).toLocaleString("en-IN")} rs`,
    margin + 137,
    margin + 50
  );

  pdf.setFontSize(16);
  pdf.text("Month-wise EMI Payments", margin, margin + 70);

  const canvas = await html2canvas(input);
  const imgData = canvas.toDataURL("image/png");
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let position = margin + 80; // Start position after the additional details

  pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);

  let heightLeft = imgHeight + position + margin - pageHeight; // Adjust heightLeft calculation

  while (heightLeft > 0) {
    pdf.addPage();
    position = margin; // Reset position to the top margin for each new page
    pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save("emi-details.pdf");
};

export const emiCalculator = (
  principal: number,
  annualRate: number,
  years: number,
  startMonth: number,
  startYear: number
) => {
  const monthlyRate = annualRate / 12 / 100;
  const nPayments = years * 12;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, nPayments)) /
    (Math.pow(1 + monthlyRate, nPayments) - 1);

  let remainingBalance = principal;
  let totalPaidToDate = 0;
  let totalInterestPayable = 0;

  const emiDetails = [];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let prevPrincipalForMonth = 0;
  for (let month = 1; month <= nPayments; month++) {
    const interestForMonth = remainingBalance * monthlyRate;
    const principalForMonth = emi - interestForMonth;
    remainingBalance -= principalForMonth;
    totalPaidToDate += emi;
    totalInterestPayable += interestForMonth;
    let sumPrincipalForMonth = prevPrincipalForMonth + principalForMonth;
    prevPrincipalForMonth = sumPrincipalForMonth;
    const loanPaidPercentage = (sumPrincipalForMonth / principal) * 100;
    const currentMonthIndex = (startMonth + month - 1) % 12;
    const currentMonthName = monthNames[currentMonthIndex];
    const currentYear = startYear + Math.floor((startMonth + month - 1) / 12);
    emiDetails.push({
      month: month,
      currentMonthIndex: currentMonthIndex,
      currentMonthName: currentMonthName,
      currentYear: currentYear,
      principal: principalForMonth.toFixed(0),
      interest: interestForMonth.toFixed(0),
      totalPayment: emi.toFixed(0),
      balance: remainingBalance.toFixed(0),
      loanPaidToDate: loanPaidPercentage.toFixed(2) + "%",
    });
  }

  const totalPayment = emi * nPayments;

  return {
    EMI: emi.toFixed(0),
    "Total Interest Payable": totalInterestPayable.toFixed(0),
    "Total Payment": totalPayment.toFixed(0),
    "EMI Details": emiDetails,
  };
};
