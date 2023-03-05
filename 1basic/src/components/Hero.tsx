import { Box, Paper, Typography } from '@mui/material';

const Hero = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url('https://macrofoodz.com.au/wp-content/uploads/2022/08/MFZ-BANNER-1-scaled.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '600px',
      }}>
      <Paper
        sx={{
          maxWidth: '600px',
          marginTop: 'auto',
          marginBottom: '50px',
        }}>
        <Typography mb={2} mt={3} textAlign="center" variant="h3">
          Delicious Food, Delivered To You
        </Typography>
        <Typography textAlign="center">
          Choose your favorite meal from our broad selection of available meals and enjoy delicious
          lunch dinner at home.
        </Typography>
        <Typography textAlign="center">
          All our meals are cooked with high-quality ingredients, just-in-time and of course by
          experience chefs!
        </Typography>
      </Paper>
    </Box>
  );
};

export default Hero;
