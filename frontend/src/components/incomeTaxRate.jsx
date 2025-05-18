import React from 'react';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

const ChooseIncomeTaxRate = ({incomeTaxRate, handleChange}) => {
  const incomeTaxRates = Array.from({ length: 15 }, (_, i) => (i + 30) / 100); // 6% to 20%

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Income Tax Rate</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={incomeTaxRate}
        label="Income Tax Rate"
        onChange={handleChange}
      >
        {incomeTaxRates.map((rate) => (
          <MenuItem key={rate} value={rate}>
            {(rate * 100).toFixed(0)}%
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ChooseIncomeTaxRate;
