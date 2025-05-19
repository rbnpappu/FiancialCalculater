import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import CalculateIcon from "@mui/icons-material/Calculate";

const YearlyIncomeTaxDeduction = () => {
  const [monthlyIncome, setMonthlyIncome] = useState({
    income1: "",
    income2: "",
    income3: "",
    income4: "",
    income5: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setMonthlyIncome({
      ...monthlyIncome,
      [e.target.name]: e.target.value,
    });
  };

  const handleCalculate = () => {
    const {
      income1,
      income2,
      income3,
      income4,
      income5,
    } = monthlyIncome;

    const totalMonthly =
      Number(income1 || 0) +
      Number(income2 || 0) +
      Number(income3 || 0) +
      Number(income4 || 0) +
      Number(income5 || 0);

    const yearlyIncome = totalMonthly * 12;

    let taxRate = 0;
    if (yearlyIncome <= 250000) {
      taxRate = 0;
    } else if (yearlyIncome <= 500000) {
      taxRate = 0.05;
    } else if (yearlyIncome <= 1000000) {
      taxRate = 0.10;
    } else {
      taxRate = 0.20;
    }

    const taxAmount = yearlyIncome * taxRate;
    const incomeAfterTax = yearlyIncome - taxAmount;

    setResult({
      totalMonthly,
      yearlyIncome,
      taxAmount,
      incomeAfterTax,
      taxRate,
    });
  };

  return (
    <div
      className="flex rounded-[1rem] flex-col items-center justify-center"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding: "1rem",
      }}
    >
      <label className="text-2xl font-bold font-serif text-[#fff] text-[2rem] mb-[1rem]">
        Yearly Income After Tax Deduction
      </label>

      <div className="flex flex-col gap-[1rem] w-full">
        {["income1", "income2", "income3", "income4", "income5"].map(
          (field, idx) => (
            <TextField
              key={field}
              variant="standard"
              label={`Income ${idx + 1}`}
              name={field}
              value={monthlyIncome[field]}
              onChange={handleChange}
              type="number"
            />
          )
        )}

        <div className="flex justify-center items-center">
          <Button
            variant="contained"
            sx={{
              background: "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
            onClick={handleCalculate}
          >
            <CalculateIcon />
            Calculate
          </Button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-white rounded text-black text-center">
            <h2 className="text-xl font-semibold">Results</h2>
            <p>💵 Total Monthly Income: ₹ {result.totalMonthly.toLocaleString()}</p>
            <p>📆 Yearly Income: ₹ {result.yearlyIncome.toLocaleString()}</p>
            <p>📉 Tax Deducted ({result.taxRate * 100}%): ₹ {result.taxAmount.toLocaleString()}</p>
            <p>✅ Yearly Income After Tax: ₹ {result.incomeAfterTax.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YearlyIncomeTaxDeduction;
