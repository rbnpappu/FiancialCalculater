import React from 'react';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

const CapitalGainTaxRate = ({capitalGainTax,handleChange}) => {
  const capitalGainTaxRates = Array.from({ length: 15 }, (_, i) => (i + 20) / 100); // 6% to 20%



  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Capital Gain Tax Rate</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={capitalGainTax}
        label="Capital Gain Tax"
        onChange={handleChange}
      >
        {capitalGainTaxRates.map((rate) => (
          <MenuItem key={rate} value={rate}>
            {(rate * 100).toFixed(0)}%
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CapitalGainTaxRate;
