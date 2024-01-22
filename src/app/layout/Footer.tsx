"use client"
import { AppBar, Toolbar, Typography } from '@mui/material';

// Footer component
export const Footer = () => {
  const drawerWidth = 340;

  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, top: 'auto', bottom: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Your Footer Content Here
        </Typography>
      </Toolbar>
    </AppBar>
  );
};



