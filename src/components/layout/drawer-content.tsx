import { FC } from 'react';
import { AcUnitOutlined, ArrowDropDown, ArrowRight } from '@mui/icons-material';
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAppBase, getUserMenus } from '@/domains/auth/slice';

type DrawerContentProps = {
  handleNavigationClick: (name: string) => void;
  openNavMenu: string | null;
};

export const DrawerContent: FC<DrawerContentProps> = ({ handleNavigationClick, openNavMenu }) => {
  const menus = useSelector(getUserMenus);
  const appBase = useSelector(getAppBase);

  return (
    <div>
      <Toolbar sx={{ textDecoration: 'none' }} component={Link} to={appBase!}>
        <AcUnitOutlined color='primary' fontSize='large' />
        <Typography variant='h6' sx={{ ml: 2, color: blue[800] }}>
          School Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List component='nav' sx={{ width: '100%' }}>
        {menus &&
          menus.map(({ name, path, subMenus }) => {
            if (Array.isArray(subMenus) && subMenus.length > 0) {
              return (
                <Box key={name}>
                  <ListItemButton onClick={() => handleNavigationClick(name)}>
                    {/* <ListItemIcon>
                      <img width='20px' height='20px' src={`${API_URL}/${icon}`} />
                    </ListItemIcon> */}
                    <ListItemText primary={name} />
                    {openNavMenu === name ? <ArrowDropDown /> : <ArrowRight />}
                  </ListItemButton>
                  <Collapse
                    in={openNavMenu === name}
                    timeout='auto'
                    unmountOnExit
                    sx={{ paddingLeft: '15px' }}
                  >
                    <List component='div'>
                      {subMenus.map(({ name, path }) => (
                        <ListItemButton
                          key={name}
                          component={Link}
                          to={`${appBase}/${path}`}
                          sx={{ borderLeft: '1px solid black' }}
                        >
                          <ListItemText primary={name} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              );
            } else {
              return (
                <ListItemButton key={name} component={Link} to={`${appBase}/${path}`}>
                  {/* <ListItemIcon>
                    <img width='20px' height='20px' src={`${API_URL}/${icon}`} />
                  </ListItemIcon> */}
                  <ListItemText primary={name} />
                </ListItemButton>
              );
            }
          })}
      </List>
    </div>
  );
};
