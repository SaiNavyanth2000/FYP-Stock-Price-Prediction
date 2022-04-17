import { useNavigate } from 'react-router-dom';
import { Box, Typography, Select, MenuItem, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Company(props) {
  const navigation = useNavigate();

  const handleClick = () => {
    let path = '/predict';
    navigation(path, { state: { ticker: props.ticker } });
  };

  return (
    <Box
      display="flex"
      width="30%"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="12px 24px 12px lightgrey"
      paddingLeft="30px"
      paddingBottom="30px"
    >
      <Box width="70%">
        <h4>{props.name}</h4>
        <p>Ticker Symbol: {props.ticker}</p>
        <p>{props.text}</p>
        <Button variant="contained" onClick={handleClick}>
          Predict Price
        </Button>
      </Box>
      <Box width="40%">
        <img
          width="150px"
          src={process.env.PUBLIC_URL + `images/logos/${props.name}.jpg`}
        />
      </Box>
    </Box>
  );
}

export default Company;
