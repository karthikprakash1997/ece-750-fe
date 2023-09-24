import { Grid, Button, Autocomplete, TextField } from '@mui/material';
import NestedTable from './nestedTable';

const Report = () => {
  const countries = [
    { code: 'AD', label: 'Andorra' },
    {
      code: 'AE',
      label: 'United Arab Emirates',
    },
    { code: 'AF', label: 'Afghanistan' },
    {
      code: 'AG',
      label: 'Antigua and Barbuda',
    },
  ];

  const tableData = [
    {
      name: 'Oli Bob',
      location: 'United Kingdom',
      gender: 'male',
      col: 'red',
      dob: '14/04/1984',
      _children: [
        {
          name: 'Mary May',
          location: 'Germany',
          gender: 'female',
          col: 'blue',
          dob: '14/05/1982',
        },
        {
          name: 'Christine Lobowski',
          location: 'France',
          gender: 'female',
          col: 'green',
          dob: '22/05/1982',
        },
        {
          name: 'Brendon Philips',
          location: 'USA',
          gender: 'male',
          col: 'orange',
          dob: '01/08/1980',
          _children: [
            {
              name: 'Margret Marmajuke',
              location: 'Canada',
              gender: 'female',
              col: 'yellow',
              dob: '31/01/1999',
            },
            {
              name: 'Frank Harbours',
              location: 'Russia',
              gender: 'male',
              col: 'red',
              dob: '12/05/1966',
            },
          ],
        },
      ],
    },
    {
      name: 'Jamie Newhart',
      location: 'India',
      gender: 'male',
      col: 'green',
      dob: '14/05/1985',
    },
    {
      name: 'Gemma Jane',
      location: 'China',
      gender: 'female',
      col: 'red',
      dob: '22/05/1982',
      _children: [
        {
          name: 'Emily Sykes',
          location: 'South Korea',
          gender: 'female',
          col: 'maroon',
          dob: '11/11/1970',
        },
      ],
    },
    {
      name: 'James Newman',
      location: 'Japan',
      gender: 'male',
      col: 'red',
      dob: '22/03/1998',
    },
  ];

  const columns = [
    { title: 'Name', field: 'name', width: 200, responsive: 0 },
    { title: 'Location', field: 'location', width: 150 },
    { title: 'Gender', field: 'gender', width: 150, responsive: 2 },
    { title: 'Favourite Color', field: 'col', width: 150 },
    {
      title: 'Date Of Birth',
      field: 'dob',
      hozAlign: 'center',
      sorter: 'date',
      width: 150,
    },
  ];

  return (
    <Grid fontSize={20}>
      <Grid item xs={12}>
        <h3>Query 1</h3>
      </Grid>
      <Grid item xs={12}>
        <span>
          If we lost access to{' '}
          <Autocomplete
            id="country-select-demo"
            sx={{
              display: 'inline-block',
              width: 200,
              verticalAlign: 'middle',
            }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <div {...props}>
                {option.label} ({option.code})
              </div>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />{' '}
          as a supplier, what would be the impact?
        </span>
        <span style={{ marginLeft: '20px' }}>
          <Button variant="contained" color="success">
            Generate Report
          </Button>
        </span>
      </Grid>

      <Grid item xs={12}>
        <h3>Query 2</h3>
      </Grid>
      <Grid item xs={12}>
        <span>
          If we lost access to{' '}
          <Autocomplete
            id="country-select-demo"
            sx={{
              display: 'inline-block',
              width: 200,
              verticalAlign: 'middle',
            }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <div {...props}>
                {option.label} ({option.code})
              </div>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />{' '}
          as a supplier, what are the safe (=reliability) alternatives?
        </span>
        <span style={{ marginLeft: '20px' }}>
          <Button variant="contained" color="success">
            Generate Report
          </Button>
        </span>
      </Grid>

      <Grid item xs={12}>
        <h3>Report</h3>
      </Grid>
      <br></br>
      <Grid item xs={12}>
        <NestedTable tableData={tableData} columns={columns}></NestedTable>
      </Grid>
    </Grid>
  );
};

export default Report;
