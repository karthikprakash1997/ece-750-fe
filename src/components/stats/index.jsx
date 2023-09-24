import { Grid, Typography } from '@mui/material';

const Stats = ({ props }) => {
  const { background, title, value, Content, Icon } = props;
  return (
    <Grid paddingTop={title === 'Data Count' ? 0 : 2} paddingLeft={1.5}>
      {title === 'Data Count' ? (
        <>
          <Typography component={'div'} sx={{ fontSize: 15, fontWeight: 400 }}>
            DATA COUNT
          </Typography>
          <Typography component={'div'} sx={{ fontSize: 40, fontWeight: 600 }}>
            {value}
          </Typography>
        </>
      ) : Content ? (
        <Grid
          display={'flex'}
          alignItems={'center'}
          //   rowSpacing={2}
          columnGap={1.5}
        >
          {Content}

          <Typography component={'div'} sx={{ fontSize: 15, fontWeight: 400 }}>
            {title}
          </Typography>
        </Grid>
      ) : (
        <Grid
          display={'flex'}
          alignItems={'center'}
          rowSpacing={2}
          columnGap={1.5}
        >
          <Grid
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            height={'52px'}
            width={'52px'}
            sx={{ boxShadow: 5, borderRadius: 3 }}
            style={{ background }}
          >
            {Icon}
          </Grid>
          <Grid>
            <Typography
              component={'div'}
              sx={{ fontSize: 15, fontWeight: 400 }}
            >
              {title}
            </Typography>
            <Typography
              component={'div'}
              sx={{ fontSize: 20, fontWeight: 600 }}
            >
              {value}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

// linear-gradient(195deg, #49a3f1, #1A73E8)
// linear-gradient(195deg, #66BB6A, #43A047)
// linear-gradient(195deg, #EC407A, #D81B60)

export default Stats;
