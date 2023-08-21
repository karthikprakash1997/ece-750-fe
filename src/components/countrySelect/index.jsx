import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Country } from 'country-state-city';
import { FlagIcon } from 'react-flag-kit';
import { Box } from '@mui/material';

export const CheckboxLabels = () => {
  return (
    <FormGroup >
      {Country.getAllCountries().map((it) => {
        console.log(it, 'it');
        if(it.name==='Antarctica') return null;
        return (
          <Box key={it.isoCode}  display={'flex'} columnGap={0.25} alignItems={'center'}>
            <FormControlLabel control={<Checkbox defaultChecked />} label={it.name} />
            <FlagIcon country code={it.isoCode} size={20} />
          </Box>
        );
      })}
      {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Country 1" />
      <FormControlLabel required control={<Checkbox />} label="Country 2" />
      <FormControlLabel disabled control={<Checkbox />} label="Country 3" /> */}
    </FormGroup>
  );
};
