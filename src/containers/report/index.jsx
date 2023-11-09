import {
  Grid,
  Button,
  Autocomplete,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import NestedTable from "./nestedTable";
import { useDispatch, useSelector } from "react-redux";
import { reportActions } from "../../slices/report";
import { useState } from "react";
import { customLinkFormatter } from "../../utils/helpers/common";

const columns = [
  {
    title: "Category Name",
    field: "category",
    width: 600,
    formatter: customLinkFormatter,
    headerTooltip: true,
  },
  {
    title: "Percentage in category inaccessible",
    field: "percentage",
    type: "numeric",
    headerTooltip: true,
    width: 150,
  },
  {
    title: "Parts in category inaccessible",
    field: "count",
    type: "numeric",
    headerTooltip: true,
    width: 250,
  },
];

const columnsQuery2 = [
  {
    title: "Category Name",
    field: "category",
    width: 600,
    responsive: 0,
    formatter: customLinkFormatter,
    headerTooltip: true,
  },
  {
    title: "Percentage contribution to category",
    field: "percentage",
    width: 150,
    headerTooltip: true,
  },
  {
    title: "Countries",
    field: "countries",
    width: 450,
    responsive: 2,
    headerTooltip: true,
  },
  {
    title: "Percentage contribution of the selected country to the category",
    field: "percentageLost",
    width: 150,
    responsive: 2,
    headerTooltip: true,
  },
];

const columnsQuery3 = [
  {
    title: "Category Name",
    field: "category",
    width: 600,
    responsive: 0,
    formatter: customLinkFormatter,
    headerTooltip: true,
  },
  {
    title: "Countries",
    field: "countries",
    width: 750,
    responsive: 2,
    headerTooltip: true,
  },
  { title: "Percentage", field: "percentage", width: 150, headerTooltip: true },
];

const CountrySelect = ({ options, onChange, renderOption, getOptionLabel,value }) => {
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
      value={value}
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

const BNTextField = ({ setState, defaultValue,value }) => {
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
      value={value}
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

  const queryOneData = useSelector((state) => state.report.queryOneData);
  const queryTwoData = useSelector((state) => state.report.queryTwoData);
  const queryThreeData = useSelector((state) => state.report.queryThreeData);
  const queryFourData = useSelector((state) => state.report.queryFourData);

  const queryOne = useSelector((state) => state.report.queryOne);
  const queryTwo = useSelector((state) => state.report.queryTwo);
  const queryThreeBN = useSelector((state) => state.report.queryThreeBN);
  const queryFourBN = useSelector((state) => state.report.queryFourBN);
  const queryTwoBN = useSelector((state) => state.report.queryTwoBN);

  const queryOneTitle = useSelector((state) => state.report.queryOneTitle);
  const queryTwoTitle = useSelector((state) => state.report.queryTwoTitle);
  const queryThreeTitle = useSelector((state) => state.report.queryThreeTitle);
  const queryFourTitle = useSelector((state) => state.report.queryFourTitle);

  const dispatch = useDispatch();
  const [selectedQuery, setSelectedQuery] = useState("q1");

  const QUERY = [
    {
      title: "Query 1",
      value: "q1",
      component: () => (
        <>
          <Grid item xs={12}>
            <h3>Query 1</h3>
          </Grid>
          <Grid item xs={12}>
            <span>
              If we lost access to{" "}
              <CountrySelect
                options={countriesList}
                onChange={(e, value) => {
                  dispatch(reportActions.setQueryOne(value));
                }}
                value={queryOne}
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
              tableTitle={queryOneTitle}
              tableData={queryOneData}
              columns={columns}
              isCountry={false}
            ></NestedTable>
          </Grid>
        </>
      ),
    },
    {
      title: "Query 2",
      value: "q2",
      component: () => (
        <>
          <Grid item xs={12}>
            <h3>Query 2</h3>
          </Grid>
          <Grid item xs={12}>
            <span>
              If we lost access to{" "}
              <CountrySelect
                options={countriesList}
                value={queryTwo}
                onChange={(e, value) => {
                  dispatch(reportActions.setQueryTwo(value));
                }}
                renderOption={(props, option) => (
                  <div {...props}>
                    {option.country} ({option.country_code})
                  </div>
                )}
                getOptionLabel={(option) => option.country}
              />{" "}
              as a supplier, what are the alternatives with at least{" "}
              <BNTextField
                setState={(value) =>
                  dispatch(reportActions.setQueryTwoBN(value))
                }
                value={queryTwoBN}
              />{" "}
              % global production?
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
              tableTitle={queryTwoTitle}
              tableData={queryTwoData}
              columns={columnsQuery2}
            ></NestedTable>
          </Grid>
        </>
      ),
    },
    {
      title: "Query 3",
      value: "q3",
      component: () => (
        <>
          <Grid item xs={12}>
            <h3>Query 3</h3>
          </Grid>
          <Grid item xs={12}>
            <span>
              What are the most vulnerable categories? (Each listed country
              having more than{" "}
              <BNTextField
                defaultValue={90}
                value={queryThreeBN}
                setState={(value) =>
                  dispatch(reportActions.setQueryThreeBN(value))
                }
              />{" "}
              % global production in the selected category)
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
              tableTitle={queryThreeTitle}
              tableData={queryThreeData}
              columns={columnsQuery3}
            ></NestedTable>
          </Grid>
        </>
      ),
    },
    {
      title: "Query 4",
      value: "q4",
      component: () => (
        <>
          <Grid item xs={12}>
            <h3>Query 4</h3>
          </Grid>
          <Grid item xs={12}>
            <span>
              What countries create a part bottleneck at{" "}
              <BNTextField
                defaultValue={90}
                value={queryFourBN}
                setState={(value) =>
                  dispatch(reportActions.setQueryFourBN(value))
                }
              />{" "}
              % marketshare?
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
              tableTitle={queryFourTitle}
              tableData={queryFourData}
              columns={columnsQuery3}
            ></NestedTable>
          </Grid>
        </>
      ),
    },
  ];

  return (
    <>
      <Grid
        width={"40%"}
        marginRight={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={40}
      >
        <Grid display={"flex"} alignItems={"center"} columnGap={8}>
          {QUERY.map((it) => (
            <Box
              sx={
                selectedQuery === it.value
                  ? { borderBottom: 1, borderColor: "red", borderWidth: 2 }
                  : undefined
              }
              display={"flex"}
              alignItems={"center"}
              height={40}
              key={it.title}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedQuery(it.value)}
            >
              <Typography
                color={selectedQuery === it.value ? "red" : "black"}
                textAlign={"center"}
              >
                {it.title}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
      <Grid fontSize={20}>
        {QUERY.find((it) => it.value === selectedQuery).component()}
      </Grid>
    </>
  );
};

export default Report;
