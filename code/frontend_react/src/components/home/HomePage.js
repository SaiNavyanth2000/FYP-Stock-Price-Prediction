import { useNavigate } from 'react-router-dom';
import { Box, Typography, Select, MenuItem, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Company from './Company';
import { fontStyle } from '@mui/system';

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
        <h2 style={{ marginLeft: '50px' }}>
          List of stocks used for prediction:
        </h2>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          margin="50px"
        >
          <Company
            name="Apple"
            ticker="AAPL"
            text="The historical price has been used to predict the price of the
                stock"
          ></Company>
          <Company
            name="Amazon"
            ticker="AMZN"
            text="The historical price has been used to predict the price of the
                stock"
          ></Company>
          <Company
            name="Tesla"
            ticker="TSLA"
            text="The historical price has been used to predict the price of the
                stock"
          ></Company>
        </Box>

        <Box display="flex" flexDirection="row" margin="50px">
          <Company
            name="Alphabet"
            ticker="GOOGL"
            text="The historical price has been used to predict the price of the
                stock"
          ></Company>

          <div style={{ marginLeft: '30px' }}></div>

          <Company
            name="Google"
            ticker="GOOG"
            text="The historical price has been used to predict the price of the
                stock"
          ></Company>
        </Box>

        <Box marginLeft="50px">
          <h2>Portfolio Optimization</h2>
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
            width="500px"
            src={process.env.PUBLIC_URL + 'images/opt_portfolio.jpg'}
          />

          <p>While creating the portfolio, these weights are taken in mind.</p>
          <h2>Optimal Portfolio Results:</h2>
          <p style={{ fontSize: '30px', fontStyle: 'normal' }}>
            Sharpe Ratio: <span>1.12</span>
          </p>
          <p style={{ fontSize: '30px', fontStyle: 'normal' }}>
            Return: <span>29.5%</span>
          </p>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
