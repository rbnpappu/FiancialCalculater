import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";

const YearlyExpenseCalculator = ({ yearlyIncomeAfterTax }) => {
  const [expenses, setExpenses] = useState({
    expense1: "",
    expense2: "",
    expense3: "",
    expense4: "",
    expense5: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setExpenses({
      ...expenses,
      [e.target.name]: e.target.value,
    });
  };

  const handleCalculate = () => {
    const totalExpense = Object.values(expenses).reduce(
      (acc, val) => acc + Number(val || 0),
      0
    );
  
    const yearlyExpense = totalExpense * 12;
  
    // Ensure yearlyIncomeAfterTax is a valid number or fallback to 0
    const incomeAfterTaxSafe = Number(yearlyIncomeAfterTax) || 0;
  
    const yearlyExcess = incomeAfterTaxSafe - yearlyExpense;
    const monthlyExcess = yearlyExcess / 12;
  
    setResult({
      totalExpense,
      yearlyExpense,
      yearlyExcess,
      monthlyExcess,
    });
  };
  

  return (
    <div
      className="flex flex-col items-center justify-center rounded-[1rem]"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding: "1rem",
        marginTop: "2rem",
      }}
    >
      <label className="text-2xl font-bold font-serif text-[#fff] text-[2rem] mb-[1rem]">
        Yearly Expenses
      </label>

      <div className="flex flex-col gap-[1rem] w-full">
        {["expense1", "expense2", "expense3", "expense4", "expense5"].map(
          (field, idx) => (
            <TextField
              key={field}
              variant="standard"
              label={`Expense ${idx + 1}`}
              name={field}
              value={expenses[field]}
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
            <h2 className="text-xl font-semibold">Expense Summary</h2>
            <p>💸 Total Monthly Expense: ₹ {result.totalExpense.toLocaleString()}</p>
            <p>📆 Total Yearly Expense: ₹ {result.yearlyExpense.toLocaleString()}</p>
            <p>📊 Monthly Excess: ₹ {result.monthlyExcess.toLocaleString()}</p>
            <p>✅ Yearly Excess: ₹ {result.yearlyExcess.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YearlyExpenseCalculator;
