import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FlagIcon } from 'react-flag-kit';
import { Box } from '@mui/material';
import { countriesActions } from '../../slices';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const CountrySelect = ({
  search,
  countryFilter,
  onUpdateCountryFilter,
}) => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) =>
    state?.countries?.countriesList?.data?.filter((it) =>
      it?.country?.toLowerCase()?.includes(search),
    ),
  );
  // const classes = useStyles();

  useEffect(() => {
    dispatch(countriesActions.fetchCountries());
  }, []); //eslint-disable-line

  // Callback function to handle checkbox change
  const handleCheckboxChange = (isoCode) => {
    const updatedCountryFilter = [...countryFilter];
    if (updatedCountryFilter.includes(isoCode)) {
      updatedCountryFilter.splice(updatedCountryFilter.indexOf(isoCode), 1);
    } else {
      updatedCountryFilter.push(isoCode);
    }
    onUpdateCountryFilter(updatedCountryFilter); // Update the countryFilter state in the parent component
  };

  return (
    <FormGroup>
      {countriesList?.map((element) => {
        if (element['country'] === 'Antarctica') return null;
        return (
          <Box
            key={element['country_code']}
            display={'flex'}
            columnGap={0.25}
            alignItems={'center'}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={countryFilter.includes(element['country_code'])}
                  onChange={() => handleCheckboxChange(element['country_code'])}
                />
              }
              label={element['country']}
            />
            <FlagIcon country code={element['country_code']} size={20} />
          </Box>
        );
      })}
    </FormGroup>
  );
};
