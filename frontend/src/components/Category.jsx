import React, { useState } from 'react';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

const Category = () => {
  const [inflation, setInflation] = useState('');

  const handleChange = (event) => {
    setInflation(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="inflation-rate-label">Inflation Rate</InputLabel>
      <Select
        labelId="inflation-rate-label"
        id="inflation-rate-select"
        value={inflation}
        label="Inflation Rate"
        onChange={handleChange}
      >
        <MenuItem value="Needs">Needs</MenuItem>
        <MenuItem value="Wants">Wants</MenuItem>
        <MenuItem value="Business">Business</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Category;
