import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Typography, Divider } from '@mui/material';

function About() {
  return (
    <Box
      display="flex"
      marginTop="130px"
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: { xs: 'center', md: 'space-between' },
        alignItems: { xs: 'left', md: 'flex-start' },
      }}
    >
      <Box maxWidth="600px" marginLeft="200px">
        <Typography variant="h4">Who am I?</Typography>
        <Typography variant="h5" style={{ marginTop: '50px' }}>
          Hi! I am <span style={{ color: '#F46B6F' }}>Sai Navyanth</span>, a
          final year Computer Science student at CityU. This project is a part
          of my Final Year Project, where I work both on a web-app to predict
          the price of a stock depending on the historical prices by using
          machine learning algorithms. I am personally a tech enthusiast and am
          always looking forward to new challenges.
        </Typography>
        <Typography variant="h5" style={{ marginTop: '20px' }}>
          Having spent majority of my undergraduate degree during the pandemic
          year, I decided to utilize my tech skills in the finance industry!
          Having worked as the Head of Quantitative Research at the CityU
          Research and Investment Club at my University, I decided to take up
          this project on using ML for stock price prediction as my Final Year
          Project.
        </Typography>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }} marginRight="100px">
        <img
          src={`./images/me.jpeg`}
          alt="Card Photograph"
          width="600px"
          height="400px"
        />
      </Box>
    </Box>
  );
}

export default About;
