import { MouseEvent, ReactNode, useState } from 'react';
import { Box, Drawer, Toolbar } from '@mui/material';

import { AppBarLayout } from './app-bar-layout';
import { DrawerContent } from './drawer-content';

const drawerWidth = 280;
export const MainLayout = ({ children }: { children: ReactNode }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openNavMenu, setOpenNavMenu] = useState<null | string>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleNavigationClick = (name: string) => {
    setOpenNavMenu(name === openNavMenu ? null : name);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarLayout
        handleDrawerToggle={handleDrawerToggle}
        handleMenu={handleMenu}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        drawerWidth={drawerWidth}
      />
      <Box component='nav' sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          <DrawerContent handleNavigationClick={handleNavigationClick} openNavMenu={openNavMenu} />
        </Drawer>
        <Drawer
          open
          variant='permanent'
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          <DrawerContent handleNavigationClick={handleNavigationClick} openNavMenu={openNavMenu} />
        </Drawer>
      </Box>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        <>{children}</>
      </Box>
    </Box>
  );
};
