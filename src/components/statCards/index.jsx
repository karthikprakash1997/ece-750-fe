import { Grid, Typography } from '@mui/material';

const StatsCards = ({ props }) => {
  const { background, title, subTitle, Content, Icon } = props;
  return (
    <Grid
      key={Math.random()}
      height={80}
      sx={{ boxShadow: 5, borderRadius: 3, ':hover': { marginTop: -0.5, transition: 10 }, transition: 5 }}
      bgcolor={'white'}
      item
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <Grid display={'flex'} alignItems={'center'} justifyContent={'center'} margin={1} height={'3.5rem'} width={'7rem'} sx={{ boxShadow: 5, borderRadius: 3 }} style={{ background }} marginTop={-6}>
        {Icon}
      </Grid>
      <Grid width={'-webkit-fill-available'}>
        <Typography component={'div'} variant="h6" color="CaptionText">
          {title}
        </Typography>
        <Typography component={'div'} variant="body2" color="textSecondary">
          {subTitle}
        </Typography>
      </Grid>
      <Grid container width={'fit-content'} direction={'row'} justifyContent={'flex-end'} marginRight={0.75}>
        {Content}
      </Grid>
    </Grid>
  );
};

// linear-gradient(195deg, #49a3f1, #1A73E8)
// linear-gradient(195deg, #66BB6A, #43A047)
// linear-gradient(195deg, #EC407A, #D81B60)

export default StatsCards;
