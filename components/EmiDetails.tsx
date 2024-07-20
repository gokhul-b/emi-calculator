import React from "react";
import { Button } from "./ui/button";
import { downloadPDF } from "@/app/actions";

const EmiDetails = () => {
  return (
    <div className="border w-full">
      <Button className="max-w-sm" onClick={() => downloadPDF("emi-table")}>
        Download PDF
      </Button>
    </div>
  );
};

export default EmiDetails;
