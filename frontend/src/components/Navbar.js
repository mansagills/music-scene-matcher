import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <MusicNoteIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Music Scene Matcher
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/recommendations">
            Recommendations
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 