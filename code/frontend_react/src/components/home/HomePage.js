import { useNavigate } from 'react-router-dom';
import { Box, Typography, Select, MenuItem, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // const [tick, setTick] = React.useState("");
  // const [loading, setLoading] = React.useState(true);

  // const handleChange = (event) => {
  //   setTick(event.target.value);
  //   setLoading(false);
  // };

  // let navigate = useNavigate();
  // const handleSubmit = () => {
  //   let path = "/predict";
  //   navigate(path, { state: { ticker: tick } });
  // };

  return (
    <div>
      <Box>
        <p>List of stocks used for prediction:</p>
        <Box
          display="flex"
          height="10%"
          flexDirection="row"
          justifyContent="space-between"
          margin="50px"
        >
          <Box
            display="flex"
            width="30%"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box width="70%">
              <h4>Apple</h4>
              <p>Ticker Symbol: AAPL</p>
              <p>
                The historical price has been used to predict the price of the
                stock
              </p>
              <Button variant="contained">Predict Price</Button>
            </Box>
            <Box width="40%" marginTop="20px">
              <img
                style={{ maxHeight: '5%' }}
                src={process.env.PUBLIC_URL + 'images/logos/Apple.jpg'}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            width="30%"
            flexDirection="row"
            justifyContent="space-between"
            marginLeft="40px"
          >
            <Box width="70%">
              <h4>Amazon</h4>
              <p>Ticker Symbol: AMZN</p>
              <p>
                The historical price has been used to predict the price of the
                stock
              </p>
              <Button variant="contained">Predict Price</Button>
            </Box>
            <Box width="40%" marginTop="50px">
              <img
                style={{ maxHeight: '3%' }}
                src={process.env.PUBLIC_URL + 'images/logos/Amazon.jpg'}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            width="30%"
            flexDirection="row"
            marginLeft="40px"
            justifyContent="space-between"
          >
            <Box width="70%">
              <h4>Tesla</h4>
              <p>Ticker Symbol: TSLA</p>
              <p>
                The historical price has been used to predict the price of the
                stock
              </p>
              <Button variant="contained">Predict Price</Button>
            </Box>
            <Box width="30%" marginTop="20px">
              <img
                style={{ maxHeight: '5%' }}
                src={process.env.PUBLIC_URL + 'images/logos/Tesla.jpg'}
              />
            </Box>
          </Box>
        </Box>

        <Box marginLeft="50px">
          <h3>Portfolio Optimization</h3>
          <p>
            Mone Carlo Simulation technique has been used to find a portfolio
            with the best sharpe ratio.
          </p>
          <p>
            Sharpre Ratio measures the performance of an investment such as a
            security or portfolio compared to a risk-free asset, after adjusting
            for its risk.
          </p>

          <p>
            For the above 6 stocks, these are the weights in the best portfolio
            formed:
          </p>
          <img
            style={{ maxHeight: '5%' }}
            src={process.env.PUBLIC_URL + 'images/opt_portfolio.jpg'}
          />

          <p>While creating the portfolio, these weights are taken in mind.</p>
          <p>
            The sharpe ratio of the best portfolio formed is: <span>1.27</span>{' '}
            with a return of <span>30.9%</span>
          </p>
          <p>Go to the prediction page: </p>
          <Link to="/predict">Price Prediction</Link>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
