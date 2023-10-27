import { Grid, Button, Autocomplete, TextField } from "@mui/material";
import NestedTable from "./nestedTable";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { reportActions } from "../../slices/report";

const columns = [
  { title: "Category Name", field: "category", width: 600 },
  {
    title: "Percentage in category inaccessible",
    field: "percentage",
    type: "numeric",
    width: 150,
  },
  {
    title: "Parts in category inaccessible",
    field: "count",
    type: "numeric",
    width: 250,
  },
];

const columnsQuery2 = [
  { title: "Category Name", field: "category", width: 600, responsive: 0 },
  {
    title: "Percentage contribution to category",
    field: "percentage",
    width: 150,
  },
  { title: "Countries", field: "countries", width: 250, responsive: 2 },
];

const columnsQuery3 = [
  { title: "Category Name", field: "category", width: 600, responsive: 0 },
  // { title: 'Percentage', field: 'percentage', width: 150 },
  { title: "Countries", field: "countries", width: 250, responsive: 2 },
];

const CountrySelect = ({ options, onChange, renderOption, getOptionLabel }) => {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{
        display: "inline-block",
        width: 200,
        verticalAlign: "middle",
      }}
      options={options}
      autoHighlight
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      // value={queryOne}
      onChange={onChange}
      size="small"
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

const BNTextField = ({ setState, defaultValue }) => {
  return (
    <TextField
      type="number"
      InputProps={{
        inputProps: {
          max: 100,
          min: 0,
        },
      }}
      size="small"
      defaultValue={defaultValue || 20}
      onChange={(e) => {
        setState(+e.target.value);
      }}
      label="Percentage"
    />
  );
};

const Report = () => {
  // const tableData3 = [
  //   {
  //     category: "Amplifier",
  //     percentage: "20%",
  //     country: "USA,China",
  //     _children: [
  //       {
  //         category: "Amplifier Child 1",
  //         percentage: "30%",
  //         country: "Taiwan,France",
  //       },
  //       {
  //         category: "Amplifier Child 2",
  //         percentage: "40%",
  //         country: "USA,Taiwan",
  //       },
  //       {
  //         category: "Amplifier Child 3",
  //         percentage: "60%",
  //         country: "USA",
  //         _children: [
  //           {
  //             category: "Amplifier Child 3 Child 1",
  //             percentage: "50%",
  //             country: "USA,Germany",
  //           },
  //           {
  //             category: "Amplifier Child 3 Child 2",
  //             percentage: "70%",
  //             country: "Germany",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     category: "Screws",
  //     percentage: "65%",
  //     country: "Germany",
  //   },
  //   {
  //     category: "Bolts",
  //     percentage: "90%",
  //     country: "Germany",
  //     _children: [
  //       {
  //         category: "Bolts Child 1",
  //         percentage: "90%",
  //         country: "Germany",
  //       },
  //     ],
  //   },
  //   {
  //     category: "Microprocessor",
  //     percentage: "40%",
  //     country: "Germany",
  //   },
  // ];

  const countriesList = useSelector(
    (state) => state?.countries?.countriesList?.data
  );

  const queryOneData = useSelector((state) => state.report.queryOne);

  const queryTwoData = useSelector((state) => state.report.queryTwo);

  const queryThreeData = useSelector((state) => state.report.queryThree);

  const queryFourData = useSelector((state) => state.report.queryFour);

  const dispatch = useDispatch();

  const [queryOne, setQueryOne] = useState("");
  const [queryTwo, setQueryTwo] = useState("");
  const [queryTwoBN, setQueryTwoBN] = useState(20);
  const [queryThreeBN, setQueryThreeBN] = useState(80);
  const [queryFourBN, setQueryFourBN] = useState(90);

  return (
    <Grid fontSize={20}>
      <Grid item xs={12}>
        <h3>Query 1</h3>
      </Grid>
      <Grid item xs={12}>
        <span>
          If we lost access to{" "}
          <CountrySelect
            options={countriesList}
            onChange={(e, value) => {
              setQueryOne(value);
            }}
            renderOption={(props, option) => (
              <div {...props}>
                {option.country} ({option.country_code})
              </div>
            )}
            getOptionLabel={(option) => option.country}
          />
          as a supplier, what would be the impact?
        </span>
        <span style={{ marginLeft: "20px" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              const par = {
                countryCode: [queryOne.country_code],
              };
              dispatch(reportActions.fetchQueryOneData(par));
            }}
          >
            Generate Report
          </Button>
        </span>
      </Grid>
      <Grid item xs={12}>
        <h3>Report</h3>
      </Grid>
      <Grid item xs={12}>
        <NestedTable
          tableTitle={`If we lost access to ${queryOne.country} as a supplier, the following categories will be effected.`}
          tableData={queryOneData}
          columns={columns}
          isCountry={false}
        ></NestedTable>
      </Grid>

      {/* query2  */}
      <Grid item xs={12}>
        <h3>Query 2</h3>
      </Grid>
      <Grid item xs={12}>
        <span>
          If we lost access to{" "}
          <CountrySelect
            options={countriesList}
            onChange={(e, value) => {
              setQueryTwo(value);
            }}
            renderOption={(props, option) => (
              <div {...props}>
                {option.country} ({option.country_code})
              </div>
            )}
            getOptionLabel={(option) => option.country}
          />{" "}
          as a supplier, what are the safe (=reliability) alternatives?
          (Bottleneck percentage)
          <BNTextField setState={setQueryTwoBN} />
        </span>

        <span style={{ marginLeft: "20px" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              const par = {
                countryCode: ["", queryTwo.country_code],
                bottleneckPercentage: queryTwoBN,
              };
              dispatch(reportActions.fetchQueryTwoData(par));
            }}
          >
            Generate Report
          </Button>
        </span>
      </Grid>

      <Grid item xs={12}>
        <h3>Report</h3>
      </Grid>
      <Grid item xs={12}>
        <NestedTable
          tableTitle={`If we lost access to ${queryTwo.country} as a supplier, the following safe alternatives are?`}
          tableData={queryTwoData}
          columns={columnsQuery2}
        ></NestedTable>
      </Grid>

      {/* query 3 */}
      <Grid item xs={12}>
        <h3>Query 3</h3>
      </Grid>
      <Grid item xs={12}>
        <span>
          What are the most vulnerable categories?
          <BNTextField defaultValue={90} setState={setQueryThreeBN} /> % (One
          country having more than X% of market share for a particular category)
        </span>

        <span style={{ marginLeft: "20px" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              dispatch(
                reportActions.fetchQueryThreeData({
                  bottleneckPercentage: queryThreeBN,
                })
              );
            }}
          >
            Generate Report
          </Button>
        </span>
      </Grid>

      <Grid item xs={12}>
        <h3>Report</h3>
      </Grid>
      <Grid item xs={12}>
        <NestedTable
          tableTitle={`What are the most vulnerable categories? (One country having more than ${queryThreeBN}% of market share for a particular category)`}
          tableData={queryThreeData}
          columns={columnsQuery3}
        ></NestedTable>
      </Grid>

      {/* query 4 */}
      <Grid item xs={12}>
        <h3>Query 4</h3>
      </Grid>
      <Grid item xs={12}>
        <span>
          What countries create a part bottleneck at{" "}
          <BNTextField defaultValue={90} setState={setQueryFourBN} /> %
          marketshare?
        </span>
        <span style={{ marginLeft: "20px" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              const par = {
                bottleneckPercentage: queryFourBN,
              };
              dispatch(reportActions.fetchQueryFourData(par));
            }}
          >
            Generate Report
          </Button>
        </span>
      </Grid>

      <Grid item xs={12}>
        <h3>Report</h3>
      </Grid>
      <Grid item xs={12}>
        <NestedTable
          tableTitle={`What countries create a part bottleneck at ${queryFourBN}% market share`}
          tableData={queryFourData}
          columns={columnsQuery3}
        ></NestedTable>
      </Grid>

      {/* query 5 */}
      {/* <Grid item xs={12}>
        <h3>Query 5</h3>
      </Grid>
      <Grid item xs={12}>
        <span>
        What two neighbouring countries 
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
                size="small"
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />{' '}
          must become unavailable for a category to become a potential bottleneck
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
          tableTitle="For the selected categories, list pairs of neighbouring countries that jointly make up 90% market share. "
          tableData={tableData3}
          columns={columnsQuery3}
        ></NestedTable>
      </Grid> */}
    </Grid>
  );
};

export default Report;
