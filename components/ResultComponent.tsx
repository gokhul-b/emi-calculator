import Chart from "./Chart";

interface ResultComponentProps {
  emi: string;
  totIntPay: string;
  totPay: string;
}
const ResultComponent = ({ emi, totIntPay, totPay }: ResultComponentProps) => {
  const totIntPer = (parseFloat(totIntPay) / parseFloat(totPay)) * 100;
  const prinLoanAmtPer = 100 - totIntPer;

  const chartData = [
    { name: "Total Interest Percentage", value: totIntPer },
    { name: "Principal Loan Amount Percentage", value: prinLoanAmtPer },
  ];
  return (
    <div className="border rounded-xl p-6 shadow-md">
      <div className="flex justify-between items-start w-full">
        <div>
          <p className="text-lg font-semibold">Break-up of Total Payment</p>
          <div className="w-24 border-[#0088FE] border-2 mt-1.5 rounded-md"></div>
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="border w-2.5 h-2.5 rounded-full bg-[#00C49F]"></div>
              <p className="text-xs font-semibold text-gray-500">
                Principal Loan Amount
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="border w-2.5 h-2.5 rounded-full bg-[#0088FE]"></div>
              <p className="text-xs font-semibold text-gray-500">
                Total Interest
              </p>
            </div>
          </div>
        </div>
        <div>
          <Chart chartData={chartData} />
        </div>
      </div>
      <div className="space-y-4 mt-4">
        <div className="flex justify-between w-full">
          <p>Loan EMI</p>
          <p className="font-semibold">
            ₹ {parseInt(emi).toLocaleString("en-IN")}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Total Interest Payable</p>
          <p className="font-semibold">
            ₹ {parseInt(totIntPay).toLocaleString("en-IN")}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Total Payment (Principal + Interest)</p>
          <p className="font-semibold">
            ₹ {parseInt(totPay).toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultComponent;
