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
      category: 'Amplifier',
      percentage: '20%',
      count: '300',
      _children: [
        {
          category: 'Amplifier Child 1',
          percentage: '30%',
          count: '50',
        },
        {
          category: 'Amplifier Child 2',
          percentage: '40%',
          count: '150',
        },
        {
          category: 'Amplifier Child 3',
          percentage: '60%',
          count: '100',
          _children: [
            {
              category: 'Amplifier Child 3 Child 1',
              percentage: '50%',
              count: '30',
            },
            {
              category: 'Amplifier Child 3 Child 2',
              percentage: '70%',
              count: '70',
            },
          ],
        },
      ],
    },
    {
      category: 'Screws',
      percentage: '65%',
      count: '1300',
    },
    {
      category: 'Bolts',
      percentage: '90%',
      count: '1800',
      _children: [
        {
          category: 'Bolts Child 1',
          percentage: '90%',
          count: '1800',
        },
      ],
    },
    {
      category: 'Microprocessor',
      percentage: '40%',
      count: '4000',
    },
  ];

  const columns = [
    { title: 'Category Name', field: 'category', width: 200, responsive: 0 },
    { title: 'Percentage', field: 'percentage', width: 150 },
    { title: 'Count', field: 'count', width: 150, responsive: 2 },
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
      <Grid item xs={12}>
        <NestedTable
          tableTitle="If we lost access to China as a supplier, the following categories will be effected."
          tableData={tableData}
          columns={columns}
        ></NestedTable>
      </Grid>
    </Grid>
  );
};

export default Report;
