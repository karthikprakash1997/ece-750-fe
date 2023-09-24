import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import { TextField } from '@mui/material';
import { useParamsDeconstructor } from '../../utils/hooks';
import { Button, Grid, Slider, Typography } from '@mui/material';
import { BiSolidCategory } from 'react-icons/bi';
import { BsGlobeAmericas, BsSliders } from 'react-icons/bs';
import { RichObjectTreeView } from '../treeView';
import { CountrySelect } from '../countrySelect';

// const Root = styled("div")(({ theme }) => ({
//   height: "100%",
//   backgroundColor:
//     theme.palette.mode === "light"
//       ? grey[100]
//       : theme.palette.background.default,
// }));

const FILTER_BUTTON = [
  {
    title: 'Category',
    value: 'category',
    icon: <BiSolidCategory size={20} color="black" />,
  },
  {
    title: 'Country',
    value: 'country',
    icon: <BsGlobeAmericas size={20} color="black" />,
  },
  {
    title: 'Threshold',
    value: 'threshold',
    icon: <BsSliders size={20} color="black" />,
  },
];

export const SideDrawer = () => {
  // const { window } = props;
  const {
    queryParams,
    filter,
    selectedFilter,
    addSearchParams,
    selectedCategory,
    selectedCountry,
  } = useParamsDeconstructor();

  // This is used only for the example
  // console.log(document.querySelector(''))
  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  const [categoryFilter, setCategoryFilter] = useState([]);
  const [countryFilter, setCountryFilter] = useState([]);
  const [thresholdFilter, setThresholdFilter] = useState(
    queryParams?.thresholdFilter || 0,
  );
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!categoryFilter?.length && selectedCategory?.length) {
      setCategoryFilter(selectedCategory);
    }
    if (!countryFilter?.length && selectedCountry?.length) {
      setCountryFilter(selectedCountry);
    }
  }, []); //eslint-disable-line

  const handleApplyClick = () => {
    // Combine different filter states into a single object
    const filters = {
      ...queryParams,
      selectedCategory: categoryFilter,
      selectedCountry: countryFilter,
      // thresholdFilter,
    };

    const stringifiedFilters = JSON.stringify(filters);

    // const combinedFilters = encodeURIComponent(stringifiedFilters);

    // Store the combined filter object in local storage
    localStorage.setItem('combinedFilters', stringifiedFilters);

    // Append the selected filter to the URL
    addSearchParams(filters);
  };

  const handleCancelClick = () => {
    // Reset filter states from local storage
    const savedFilters = JSON.parse(localStorage.getItem('combinedFilters'));
    if (savedFilters) {
      setCategoryFilter(savedFilters.categoryFilter || '');
      setCountryFilter(savedFilters.countryFilter || []);
      setThresholdFilter(savedFilters.thresholdFilter || 0);
    }

    // Append the selected filter to the URL
    addSearchParams({ ...queryParams, selectedFilter });
  };

  const handleClick = (route) => {
    addSearchParams({ ...queryParams, selectedFilter: route });
  };

  // useEffect(() => {
  //   // Load combined filter object from local storage when the component mounts
  //   const savedFilters = JSON.parse(localStorage.getItem("combinedFilters"));
  //   if (savedFilters) {
  //     setCategoryFilter(savedFilters.categoryFilter || "");
  //     setCountryFilter(savedFilters.countryFilter || []);
  //     setThresholdFilter(savedFilters.thresholdFilter || 0);
  //   }
  // }, []);

  const updateCountryFilter = (newCountryFilter) => {
    setCountryFilter(newCountryFilter);
  };

  const updateCatFilter = (newCountryFilter) => {
    setCategoryFilter(newCountryFilter);
  };

  // console.log(queryParams?.selectedFilter);

  return (
    <Drawer
      anchor="right"
      open={+filter === 1}
      // open
      // onClose={handleClose}
      // onOpen={toggleDrawer(true)}
      // swipeAreaWidth={drawerBleeding}
      // disableSwipeToOpen={false}
      // ModalProps={{
      //   keepMounted: true,
      // }}
      hideBackdrop
      // height={'100%'}
      style={{ height: 200 }}
      PaperProps={{
        style: {
          overflowY: 'inherit',
          // height:750
          // overflowX:'auto'
        },
      }}
      // sx={{backgroundColor:'green'}}
    >
      <Grid marginTop={6} height={700}>
        <Typography marginLeft={2} variant="h5">
          {FILTER_BUTTON.find((it) => it.value === selectedFilter)?.title}
        </Typography>
        <Grid margin={2} display={'flex'} width={400}>
          <Grid marginLeft={-10.2}>
            <Grid
              // variant="contained"
              // aria-label="outlined secondary button group"
              // color="secondary"
              display={'inline-flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignContent={'center'}
              // back
              // orientation="vertical"
              sx={{
                // borderLeft:1,
                backgroundColor: 'transparent',
                borderRadius: 2,
                boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.15)',
              }}
            >
              {FILTER_BUTTON.map((it) => (
                <Button
                  sx={{
                    backgroundColor:
                      selectedFilter === it.value ? 'red' : 'white',
                    ':hover': { backgroundColor: 'white' },
                    border: 'ButtonFace',
                    margin: 0.2,
                  }}
                  key={it.title}
                  onClick={() => handleClick(it.value)}
                >
                  {it.icon}
                </Button>
              ))}
            </Grid>
          </Grid>
          <Grid
            style={{ overflowY: 'scroll' }}
            marginLeft={3}
            width={400}
            height={550}
          >
            <Grid>
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                label="Search"
                value={search}
                variant="outlined"
                onChange={(e) => {
                  setSearch(e.currentTarget.value);
                }}
              />
            </Grid>
            {selectedFilter === FILTER_BUTTON[0].value && (
              <RichObjectTreeView
                search={search}
                selectedLeaves={categoryFilter}
                setSelectedLeaves={updateCatFilter}
              />
            )}
            {selectedFilter === FILTER_BUTTON[1].value && (
              <CountrySelect
                search={search}
                countryFilter={countryFilter}
                onUpdateCountryFilter={updateCountryFilter}
              />
            )}
            {selectedFilter === FILTER_BUTTON[2].value && (
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={thresholdFilter}
                onChange={(event, newValue) => setThresholdFilter(newValue)}
                valueLabelDisplay="auto"
                // getAriaValueText={valuetext}
              />
            )}
          </Grid>
        </Grid>
        <Grid
          display={'flex'}
          justifyContent={'center'}
          columnGap={2}
          margin={2}
        >
          <Button variant="contained" color="error" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleApplyClick}
          >
            Apply
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  );
};
