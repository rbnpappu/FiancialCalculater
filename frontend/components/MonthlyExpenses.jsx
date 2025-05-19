import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import Category from "../src/components/category"; // Ensure Category component accepts props

const MonthlyExpense = () => {
  const initialExpenses = [
    { label: "Rent", name: "rent", amount: "", category: "" },
    { label: "Loan Emi 1", name: "loanemi1", amount: "", category: "" },
    { label: "Loan Emi 2", name: "loanemi2", amount: "", category: "" },
    { label: "Loan Emi 3", name: "loanemi3", amount: "", category: "" },
    { label: "Living Expense 1", name: "livingexpense1", amount: "", category: "" },
    { label: "Living Expense 2", name: "livingexpense2", amount: "", category: "" },
    { label: "Living Expense 3", name: "livingexpense3", amount: "", category: "" },
    { label: "Desire Expense 3", name: "desireexpense3", amount: "", category: "" },
  ];

  const [expenses, setExpenses] = useState(initialExpenses);
  const [total, setTotal] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (index, value) => {
    const updated = [...expenses];
    updated[index].amount = value;
    setExpenses(updated);
    setShowResult(false); // Hide result when user edits
  };

  const handleCategoryChange = (index, value) => {
    const updated = [...expenses];
    updated[index].category = value;
    setExpenses(updated);
  };

  const handleCalculate = () => {
    const totalAmount = expenses.reduce((acc, item) => acc + Number(item.amount || 0), 0);
    setTotal(totalAmount);
    setShowResult(true); // Show result after calculation
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
        Monthly Expenses
      </label>

      <div className="flex flex-col gap-[1rem] w-full">
        {expenses.map((item, index) => (
          <div key={item.name} className="flex gap-[1rem]">
            <TextField
              variant="standard"
              label={item.label}
              name={item.name}
              value={item.amount}
              onChange={(e) => handleInputChange(index, e.target.value)}
              type="number"
            />
            <Category
              selected={item.category}
              onChange={(value) => handleCategoryChange(index, value)}
            />
          </div>
        ))}

        <div className="flex justify-center items-center mt-4">
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

        {showResult && (
          <div className="mt-4 p-4 bg-white rounded text-black text-center">
            <h2 className="text-xl font-semibold">Total Monthly Expense</h2>
            <p className="text-2xl font-bold">₹ {total.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyExpense;
