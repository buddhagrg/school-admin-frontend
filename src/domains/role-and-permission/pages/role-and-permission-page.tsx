import * as React from 'react';
import { useSelector } from 'react-redux';
import { Box, Tab, Tabs } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';

import { PageContentHeader } from '@/components/page-content-header';
import { TabPanel } from '@/components/tab-panel';
import { Menu, Permission, RolesAndPermissionState } from '../types';
import { roleAndPermissionReducer } from '../reducer';
import { useGetRolesQuery, useLazyGetRolePermissionsQuery, useLazyGetRoleUsersQuery } from '../api/role-and-permission-api';
import { getMenuList } from '../slice/menu-slice';
import { MenuAccess, Overview, RoleManage, RoleUsers } from '../components';

const initializePermissions = (menus: Menu[]): Permission[] => {
    return menus.map(menu => ({
        ...menu,
        isPermissionAvailable: false,
        subMenus: menu?.subMenus ? initializePermissions(menu.subMenus) : []
    }));
}

const updatePermissions = (permissions: Permission[], currentRolePermissions: Permission[]): Permission[] => {
    return permissions.map(permission => {
        const rolePermission = currentRolePermissions.find(p => p.id === permission.id);

        const updatedSubPermissions = (permission?.subMenus && permission.subMenus.length > 0)
            ? updatePermissions(permission.subMenus as Permission[], currentRolePermissions)
            : [];

        return {
            ...permission,
            isPermissionAvailable: rolePermission ? true : false,
            subMenus: updatedSubPermissions
        };
    });
}

const initialState: RolesAndPermissionState = {
    permissions: [],
    roleTab: 0,
    secondaryTab: 0,
    anchorElement: null,
    currentRole: {
        id: null,
        users: [],
        permissions: []
    }
};

export const RoleAndPermission = () => {
    const [state, dispatch] = React.useReducer(roleAndPermissionReducer, initialState);
    const { data } = useGetRolesQuery();
    const roles = data?.roles ?? [];
    const menus = useSelector(getMenuList);

    const [getRoleUsers] = useLazyGetRoleUsersQuery();
    const [getRolePermissions] = useLazyGetRolePermissionsQuery();

    React.useEffect(() => {
        dispatch({ type: "SET_ROLE_TAB", payload: 0 });
        dispatch({ type: "SET_SECONDARY_TAB", payload: 0 });
    }, []);

    React.useEffect(() => {
        dispatch({ type: "SET_PERMISSIONS", payload: initializePermissions(menus) });
    }, []);

    React.useEffect(() => {
        const fetchRoleUsers = async () => {
            try {
                const result = await getRoleUsers(state.currentRole.id).unwrap();
                dispatch({
                    type: "SET_ROLE_USERS",
                    payload: Array.isArray(result.users) ? result.users : []
                });
            } catch (error) {
                dispatch({ type: "SET_ROLE_USERS", payload: [] });
            }
        }

        { state.roleTab > 0 && fetchRoleUsers() }
    }, [state.roleTab]);

    React.useEffect(() => {
        const fetchRolePermissions = async () => {
            try {
                const result = await getRolePermissions(state.currentRole.id).unwrap();
                dispatch({
                    type: "SET_ROLE_PERMISSIONS",
                    payload: Array.isArray(result.permissions) ? updatePermissions(state.permissions, result.permissions) : []
                });
            } catch (error) {
                dispatch({ type: "SET_ROLE_PERMISSIONS", payload: updatePermissions(state.permissions, []) });
            }
        }

        { state.roleTab > 0 && fetchRolePermissions() }
    }, [state.secondaryTab]);

    const handleRoleTabChange = (_event: React.SyntheticEvent, index: number) => {
        let selctedRoleId: number | null = null;
        if (index > 0) {
            selctedRoleId = roles[index - 1].id || null;
        }
        dispatch({ type: "SET_ROLE_TAB", payload: index });
        dispatch({ type: "SET_ROLE_ID", payload: selctedRoleId });
        dispatch({ type: "SET_SECONDARY_TAB", payload: 0 });
        dispatch({ type: "SET_ROLE_USERS", payload: [] })
    }

    const handleSecondaryTabChange = (_event: React.SyntheticEvent, index: number) => {
        dispatch({ type: "SET_SECONDARY_TAB", payload: index });
    }

    return (
        <>
            <PageContentHeader icon={<AdminPanelSettings sx={{ mr: 1 }} />} heading="Roles & Permissions Setting" />
            <Box sx={{ display: "flex", bgcolor: 'background.paper', flexGrow: 1 }} >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={state.roleTab}
                        onChange={handleRoleTabChange}
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Overview" sx={{ borderBottom: 1, borderColor: "divider" }} />
                        {
                            roles && roles.map(({ id, name, usersAssociated }) => (
                                <Tab key={id} label={`${name} (${usersAssociated})`} />
                            ))
                        }
                    </Tabs>
                </Box>
                <TabPanel value={state.roleTab} index={0}>
                    <Overview />
                </TabPanel>
                {
                    roles && roles.map(({ id, name }, index) => (
                        <TabPanel value={state.roleTab} index={index + 1} key={id}>
                            <RoleManage id={id} name={name} />
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={state.secondaryTab}
                                    onChange={handleSecondaryTabChange}
                                >
                                    <Tab label="People" />
                                    <Tab label="Permissions" />
                                </Tabs>
                            </Box>
                            <TabPanel value={state.secondaryTab} index={0}>
                                <RoleUsers users={state.currentRole.users} />
                            </TabPanel>
                            <TabPanel value={state.secondaryTab} index={1}>
                                <MenuAccess
                                    roleId={state.currentRole.id}
                                    currentRoleMenus={state.currentRole.permissions}
                                    dispatch={dispatch}
                                />
                            </TabPanel>
                        </TabPanel>
                    ))
                }
            </Box >
        </>
    );
}
