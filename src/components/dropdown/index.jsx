import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const BasicSelect = ({ handleChange, menuItems, value }) => {
  // const [age, setAge] = React.useState('');

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  return (
    <Box
      sx={{
        minWidth: 120,
        width: 240,
        backgroundColor: 'white',
        borderRadius: 2,
        border: 'none',
        boxShadow: 4,
      }}
    >
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          //   label="Age"
          displayEmpty
          onChange={handleChange}
        >
          {menuItems.map((it) => (
            <MenuItem value={it.value}>{it.title}</MenuItem>
          ))}
          {/* <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
};
