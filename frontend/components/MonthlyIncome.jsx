import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import CalculateIcon from "@mui/icons-material/Calculate";

const MonthlyIncome = () => {
  const [monthlyIncome, setMonthlyIncome] = useState({
    salary: "",
    income1: "",
    income2: "",
    income3: "",
    income4: "",
    income5: "",
  });

  const [totalIncome, setTotalIncome] = useState(null);

  const handleChange = (e) => {
    setMonthlyIncome({
      ...monthlyIncome,
      [e.target.name]: e.target.value,
    });
  };

  const handleCalculate = () => {
    const {
      salary,
      income1,
      income2,
      income3,
      income4,
      income5,
    } = monthlyIncome;

    const total = 
      Number(salary || 0) +
      Number(income1 || 0) +
      Number(income2 || 0) +
      Number(income3 || 0) +
      Number(income4 || 0) +
      Number(income5 || 0);

    setTotalIncome(total);
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
        Monthly Income After Tax Dedcution
      </label>

      <div className="flex flex-col gap-[1rem] w-full">
        <TextField
          variant="standard"
          label="Salary"
          name="salary"
          value={monthlyIncome.salary}
          onChange={handleChange}
          type="number"
        />
        <TextField
          variant="standard"
          label="Income 1"
          name="income1"
          value={monthlyIncome.income1}
          onChange={handleChange}
          type="number"
        />
        <TextField
          variant="standard"
          label="Income 2"
          name="income2"
          value={monthlyIncome.income2}
          onChange={handleChange}
          type="number"
        />
        <TextField
          variant="standard"
          label="Income 3"
          name="income3"
          value={monthlyIncome.income3}
          onChange={handleChange}
          type="number"
        />
        <TextField
          variant="standard"
          label="Income 4"
          name="income4"
          value={monthlyIncome.income4}
          onChange={handleChange}
          type="number"
        />
        <TextField
          variant="standard"
          label="Income 5"
          name="income5"
          value={monthlyIncome.income5}
          onChange={handleChange}
          type="number"
        />

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

        {totalIncome !== null && (
          <div className="mt-4 p-4 bg-white rounded text-black text-center">
            <h2 className="text-xl font-semibold">Total Monthly Income</h2>
            <p className="text-2xl font-bold">₹ {totalIncome.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyIncome;
