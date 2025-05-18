import React from 'react';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

const ChooseInflationRate = ({inflation, handleChange}) => {
  const inflationRates = Array.from({ length: 15 }, (_, i) => (i + 6) / 100); // 6% to 20%



  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Inflation Rate</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={inflation}
        label="Inflation Rate"
        onChange={handleChange}
      >
        {inflationRates.map((rate) => (
          <MenuItem key={rate} value={rate}>
            {(rate * 100).toFixed(0)}%
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ChooseInflationRate;
