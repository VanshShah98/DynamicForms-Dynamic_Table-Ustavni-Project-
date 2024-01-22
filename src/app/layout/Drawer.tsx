"use client"
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Footer } from './Footer';
import TopBar from './TopBar';
import { ROUTES } from './Route';

type RouteInfo = {
  path: string;
  label: string;
  id?: string;
  superParent?: true;
  icon?: string;
  children: RouteInfo[];
  component?: React.ComponentType; // Add a component property
} | {
  path: string;
  icon: string;
  label: string;
  id?: string;
  superParent?: boolean;
  children?: RouteInfo[];
  component?: React.ComponentType; // Add a component property
};
const LOCAL_STORAGE_KEY = 'menuState';

const RenderMenuItem: React.FC<{ item: RouteInfo; onSelect: (route: RouteInfo) => void }> = ({
  item,
  // onSelect,
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (item.children) {
      setOpen(!open);
     } //else {
    //   onSelect(item);
    // }
  };

  useEffect(() => {
    const storedMenuState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedMenuState) {
      const parsedMenuState = JSON.parse(storedMenuState);
      if (parsedMenuState[item.path]) {
        setOpen(true);
      }
    }
  }, [item.path]);

  useEffect(() => {
    const storedMenuState = localStorage.getItem(LOCAL_STORAGE_KEY);
    const menuState = storedMenuState ? JSON.parse(storedMenuState) : {};
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...menuState, [item.path]: open }));
  }, [item.path, open]);

  return (
    <>
      <ListItemButton onClick={handleClick}>
        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
        <ListItemText primary={item.label} />
        {item.children && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {item.children && (
        <Collapse in={open} unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <RenderMenuItem
                key={child.path}
                item={child}
                // onSelect={onSelect}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default function ClippedDrawer() {
  const drawerWidth = 340;
  const [selectedRoute, setSelectedRoute] = useState<RouteInfo | null>(null);

  const handleRouteSelect = (route: RouteInfo) => {
    setSelectedRoute(route);
  };

  useEffect(() => {
    // Load the selected route from local storage on component mount
    const storedRoute = localStorage.getItem('selectedRoute');
    if (storedRoute) {
      const parsedRoute = JSON.parse(storedRoute);
      setSelectedRoute(parsedRoute);
    }
  }, []);

  useEffect(() => {
    // Save the selected route to local storage when it changes
    if (selectedRoute) {
      localStorage.setItem('selectedRoute', JSON.stringify(selectedRoute));
    }
  }, [selectedRoute]);

  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CssBaseline />
        <TopBar />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List component="div" disablePadding>
              {ROUTES.map((item) => (
                <RenderMenuItem
                  key={item.path}
                  item={item}
                  onSelect={handleRouteSelect}
                />
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 40, marginBottom: 10 }}>
          <Toolbar />
          {selectedRoute && selectedRoute.component && <selectedRoute.component />}
        </Box>
      </Box>
      <Footer />
    </Router>
  );
}
