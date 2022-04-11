import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import Link from '@mui/material/Link';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default function ButtonAppBar() {
  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroud: 'rgb(75,192,192)' }}>
        <Toolbar style={{ marginLeft: '50px', marginRight: '50px' }}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.05 }}>
            <Link to="/" style={linkStyle}>
              Home
            </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.05 }}>
            <Link to="/about" style={linkStyle}>
              About
            </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
            {/* // got idea to send props from this
            // https://ui.dev/react-router-pass-props-to-link  */}
            <Link to="/predict" style={linkStyle} state={{ ticker: 'AAPL' }}>
              Predict
            </Link>
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Typography variant="h6" component="div">
            Stock Price Prediction
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
