import { useNavigate } from 'react-router-dom';
import { Box, Typography, Select, MenuItem, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Company(props) {
  const [companyName, setName] = useState(props.name);
  const [ticker, setTicker] = useState(props.ticker);
  const [subtitle, setSubtitle] = useState(props.text);
  const [imgHeight, setImgHeight] = useState(props.height);

  return (
    <div>
      <Box width="70%">
        <h4>{companyName}</h4>
        <p>Ticker Symbol: {ticker}</p>
        <p>{subtitle}</p>
        <Button>Predict Price</Button>
      </Box>
      <Box width="30%" marginTop="20px" height={imgHeight}>
        <img
          style={{ maxHeight: imgHeight }}
          src={process.env.PUBLIC_URL + 'images/logos/' + companyName + '.jpg'}
        />
      </Box>
    </div>
  );
}

export default Company;
