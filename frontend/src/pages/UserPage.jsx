import { TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import ChooseInflationRate from "../components/chooseInflationRate";
import CapitalGainTaxRate from "../components/capitalGainTaxRate";
import ChooseIncomeTaxRate from "../components/incomeTaxRate";
import CalculateIcon from "@mui/icons-material/Calculate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import MonthlyIncome from "../../components/MonthlyIncome";
import YearlyIncomeTaxDeduction from "../../components/YearlyIncomeTaxDeduction";
import MonthlyExpense from "../../components/MonthlyExpenses";
import YearlyExpenseCalculator from "../../components/YearlyExpenseCalculator";
import LogoutButton from "../components/LogoutButton";

const UserPage = () => {
  const [formData, setFormData] = useState({
    currentAge: "",
    retirementAge: "",
    wishToLiveTill: "",
    currentIncome: "",
    inflationRate: "0.06",
    capitalGainTaxRate: "0.2",
    incomeTax: "0.3"
  });

  const [blocked, setBlocked] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      let decoded;
      try {
        decoded = jwtDecode(token);
        setUsername(decoded.name);
      } catch (error) {
        console.error("Invalid token", error);
        return;
      }
  
      try {
        const res = await axios.get(`${backendUrl}/checkblockedornot?id=${decoded.id}`);

        if (res.data.isBlocked) {
          setBlocked(true);
        } else {
          setBlocked(false);
        }
      } catch (err) {
        console.error("Failed to fetch user block status:", err);
      }
    };
  
    fetchData();
    const interval = setInterval(fetchData, 5000);
  
    return () => clearInterval(interval);
  }, [backendUrl]);
  

  useEffect(() => {
    if (blocked) {
      alert("Your access is blocked");
      localStorage.removeItem('token');
      navigate("/login");
    }
  }, [blocked, navigate]);

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalculate = () => {
    const {
      currentAge,
      retirementAge,
      wishToLiveTill,
      currentIncome,
      inflationRate,
    } = formData;

    const currAgeNum = Number(currentAge);
    const retireAgeNum = Number(retirementAge);
    const liveTillNum = Number(wishToLiveTill);
    const incomeNum = Number(currentIncome);
    const inflationNum = Number(inflationRate);

    if (!currAgeNum || !retireAgeNum || !liveTillNum || !incomeNum || !inflationNum) {
      alert("Please fill in all fields with valid numbers.");
      return;
    }
    if (retireAgeNum <= currAgeNum) {
      alert("Retirement age must be greater than current age.");
      return;
    }
    if (liveTillNum <= retireAgeNum) {
      alert("Wish to live till must be greater than retirement age.");
      return;
    }

    const yearsToRetire = retireAgeNum - currAgeNum;
    const postRetirementYears = liveTillNum - retireAgeNum;
    const expenseToday = incomeNum * 0.8;
    const inflationRateDecimal = inflationNum / 100;
    const futureExpense = expenseToday * Math.pow(1 + inflationRateDecimal, yearsToRetire);
    const realRate = (1.08 / (1 + inflationRateDecimal)) - 1;
    const corpus = futureExpense * ((1 - Math.pow(1 + realRate, -postRetirementYears)) / realRate);
    const annualSavings = corpus * realRate / (Math.pow(1 + realRate, yearsToRetire) - 1);

    setResult({
      yearsToRetire,
      postRetirementYears,
      futureExpense: futureExpense.toFixed(2),
      corpus: corpus.toFixed(2),
      annualSavings: annualSavings.toFixed(2),
    });
  };

  return (
    <div className="flex flex-col justify-center items-center  bg-[#97e6cb] p-[1rem]">
      <div className="flex gap-[2rem] flex-col">
      <div
        className="flex rounded-[1rem] flex-col items-center justify-center"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "1rem",
        }}
      >
        <label className="text-2xl font-bold font-serif text-[#fff] text-[2rem] mb-[1rem]">
          {`Welcome to ${username}`}
        </label>
        <div className="flex flex-col gap-[1rem]">
          <div className="flex gap-[1rem]">
            <TextField
              variant="standard"
              label="Current Age"
              name="currentAge"
              value={formData.currentAge}
              onChange={handleChange}
              type="number"
            />
            <TextField
              variant="standard"
              label="Retirement Age"
              name="retirementAge"
              value={formData.retirementAge}
              onChange={handleChange}
              type="number"
            />
          </div>
          <div className="flex gap-[1rem]">
            <TextField
              variant="standard"
              label="Wish To Live Till"
              name="wishToLiveTill"
              value={formData.wishToLiveTill}
              onChange={handleChange}
              type="number"
            />
            <TextField
              variant="standard"
              label="Current Salary"
              name="currentIncome"
              value={formData.currentIncome}
              onChange={handleChange}
              type="number"
            />
          </div>
          <div className="flex gap-[1rem]">
            <ChooseInflationRate inflation={formData.inflationRate} handleChange={handleChange} />
            <CapitalGainTaxRate capitalGainTax={formData.capitalGainTaxRate} handleChange={handleChange} />
          </div>
          <div>
            <ChooseIncomeTaxRate incomeTaxRate={formData.incomeTax} handleChange={handleChange} />
          </div>
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
            <div className="mt-6 border-t pt-4 space-y-2">
              <h2 className="text-lg font-bold text-gray-700">Results:</h2>
              <p>📆 Years until retirement: <strong>{result.yearsToRetire}</strong></p>
              <p>👴 Years post retirement: <strong>{result.postRetirementYears}</strong></p>
              <p>💸 Annual expense at retirement: ₹<strong>{result.futureExpense}</strong></p>
              <p>🏦 Required corpus: ₹<strong>{result.corpus}</strong></p>
              <p>💰 Annual savings required: ₹<strong>{result.annualSavings}</strong></p>
            </div>
          )}
        </div>
      </div>
      <MonthlyIncome/>
      <YearlyIncomeTaxDeduction/>
      <MonthlyExpense/>
      <YearlyExpenseCalculator/>
      <LogoutButton/>
      </div>
    </div>
  );
};

export default UserPage;
