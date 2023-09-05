import { Box, Fade, Grid, Modal, Tab, Tabs, Typography, Button, Paper } from '@mui/material';
import { useState } from 'react';

import MapView from './mapView';
import DetailView from './detailedView';
import { RichObjectTreeView } from '../../../components';
import { CountrySelect } from '../../../components/countrySelect';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25%',
  height: '60%',
  bgcolor: 'white',
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2,
  p: 4
};

const CentralSection = () => {
  const [modelState, setModelState] = useState({ isOpen: false, modelType: 'filter' });

  const [tabs, setTabs] = useState(0);
  const handleChange = (newModelState) => setModelState(newModelState);

  return (
    <>
      <Grid margin={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MapView handleModelChange={handleChange} />
          </Grid>
        </Grid>
      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modelState.isOpen}
        onClose={() => setModelState({ ...modelState, isOpen: !modelState.isOpen })}
        closeAfterTransition
        // slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={modelState.isOpen}>
          <div>
            <Box sx={style}>
              {modelState.modelType === 'filter' ? (
                <>
                  <Typography variant="h6"> Filter </Typography>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabs} onChange={(_1, newValue) => setTabs(newValue)} aria-label="basic tabs example">
                      <Tab label="category" />
                      <Tab label="Country" />
                    </Tabs>
                  </Box>
                  <Grid width={'100%'} height={'70%'}>
                    <Paper
                      style={{
                        height: '100%',
                        width: '100%',
                        overflowY: 'auto',
                        borderRadius: 0,
                        boxShadow: 'none',
                        // '&::-webkit-scrollbar': {
                        //   width: '0.4em'
                        // },
                        // '&::-webkit-scrollbar-track': {
                        //   boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                        //   webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                        // },
                        // '&::-webkit-scrollbar-thumb': {
                        //   backgroundColor: 'rgba(0,0,0,.1)',
                        //   outline: '1px solid slategrey'
                        // }
                      }}
                    >
                      {tabs === 0 ? <RichObjectTreeView /> : <CountrySelect />}
                    </Paper>
                  </Grid>
                  <Grid marginTop={2} display={'flex'} justifyContent={'flex-end'} alignItems={'self-end'} columnGap={1}>
                    <Button onClick={() => setModelState({ ...modelState, isOpen: false })} variant="contained" color="success">
                      Submit
                    </Button>
                    <Button onClick={() => setModelState({ ...modelState, isOpen: false })} variant="outlined" color="error">
                      Cancel
                    </Button>
                  </Grid>
                </>
              ) : (
                <DetailView />
              )}
            </Box>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default CentralSection;
