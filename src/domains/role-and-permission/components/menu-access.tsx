import * as React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  List,
  ListItem
} from '@mui/material';
import { ArrowRight, CheckCircleOutlined, RadioButtonUnchecked } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { Action, ExtendedPermission } from '../types';
import { useUpdateRolePermissionMutation } from '../api/role-and-permission-api';

type MenuAccessProps = {
  roleId: number | null;
  currentRolePermissions: ExtendedPermission[] | [];
  dispatch: React.Dispatch<Action>;
};

export const MenuAccess: React.FC<MenuAccessProps> = ({
  roleId,
  currentRolePermissions,
  dispatch
}) => {
  const [updatePermissions, { isLoading: isUpdatingPermissions }] =
    useUpdateRolePermissionMutation();

  const togglePermission = (
    isChecked: boolean,
    currentRolePermissions: ExtendedPermission[],
    menuId: number,
    subMenuId: number | null
  ): ExtendedPermission[] => {
    return currentRolePermissions.map((menu) => {
      if (menuId === menu.id) {
        let newSubMenus: ExtendedPermission[] = [];
        if (subMenuId === null) {
          return { ...menu, isPermissionAvailable: isChecked };
        } else if (menu.subMenus) {
          newSubMenus = menu.subMenus?.map((subMenu) =>
            subMenuId === subMenu.id
              ? {
                  ...subMenu,
                  isPermissionAvailable: !subMenu.isPermissionAvailable
                }
              : subMenu
          );
        }

        return {
          ...menu,
          subMenus: newSubMenus
        };
      }

      return menu;
    });
  };
  const handlePermissionToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
    menuId: number,
    subMenuId: number | null
  ) => {
    dispatch({
      type: 'SET_ROLE_PERMISSIONS',
      payload: togglePermission(event.target.checked, currentRolePermissions, menuId, subMenuId)
    });
  };
  const handleSave = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const ids = currentRolePermissions.flatMap((menu) => {
        const subMenuIds =
          menu?.subMenus
            ?.filter((subMenu) => subMenu.isPermissionAvailable)
            .map((subMenu) => subMenu.id) || [];
        return menu.isPermissionAvailable ? [menu.id, ...subMenuIds] : [];
      });

      const result = await updatePermissions({
        id: roleId!,
        permissions: ids.length > 0 ? ids.join(',') : ''
      }).unwrap();
      toast.info(result.message);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };
  const menuHasAnySubmenus = (subMenus?: ExtendedPermission[] | []) => {
    return !subMenus || !Array.isArray(subMenus) || subMenus.length <= 0;
  };

  return (
    <>
      {currentRolePermissions &&
        currentRolePermissions.map(
          ({ id: menuId, name, type, method, subMenus, isPermissionAvailable }) => (
            <Accordion key={menuId}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingLeft: 1,
                  backgroundColor: '#f3f6f999'
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event) => handlePermissionToggle(event, menuId, null)}
                      checked={isPermissionAvailable}
                      icon={<RadioButtonUnchecked />}
                      checkedIcon={<CheckCircleOutlined />}
                    />
                  }
                  label={`${name} (${type === 'api' ? `${type}/${method}` : `${type}`})`}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <AccordionSummary
                    expandIcon={<ArrowRight />}
                    sx={{ display: menuHasAnySubmenus(subMenus) ? 'none' : '' }}
                  />
                </Box>
              </Box>
              <AccordionDetails>
                <Grid container>
                  {subMenus &&
                    subMenus.map(({ id: subMenuId, name, type, method, isPermissionAvailable }) => (
                      <Grid xs={6} md={4} item key={subMenuId}>
                        <List>
                          <ListItem>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(event) =>
                                    handlePermissionToggle(event, menuId, subMenuId)
                                  }
                                  checked={isPermissionAvailable}
                                  icon={<RadioButtonUnchecked />}
                                  checkedIcon={<CheckCircleOutlined />}
                                />
                              }
                              label={`${name} (${type === 'api' ? `${type}/${method}` : `${type}`})`}
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          )
        )}
      <LoadingButton
        loading={isUpdatingPermissions}
        sx={{ marginTop: '20px' }}
        size='medium'
        variant='contained'
        onClick={handleSave}
      >
        Save
      </LoadingButton>
    </>
  );
};
