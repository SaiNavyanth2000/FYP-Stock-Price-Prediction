import { Box, Typography, AppBar, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1, paddingTop: '100px' }}>
      <AppBar
        position="relative"
        style={{ backgroud: 'rgb(75,192,192)', left: 0, bottom: 0, right: 0 }}
      >
        <Toolbar style={{ marginLeft: '43%' }}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 0.05 }}>
            <a
              href="https://www.github.com/SaiNavyanth2000"
              style={{ textDecoration: 'none', color: 'white', fontSize: 15 }}
              target="_blank"
              rel="noreferrer"
              data-testid="github"
            >
              <Typography variant="caption" style={{ fontSize: 20 }}>
                Github
              </Typography>
            </a>
          </Typography>

          <Typography variant="h4" component="div" sx={{ flexGrow: 0.05 }}>
            <a
              href="https://www.linkedin.com/in/sai-navyanth/"
              style={{ textDecoration: 'none', color: 'white' }}
              target="_blank"
              rel="noreferrer"
              data-testid="linkedin"
            >
              <Typography variant="caption" style={{ fontSize: 20 }}>
                LinkedIn
              </Typography>
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
