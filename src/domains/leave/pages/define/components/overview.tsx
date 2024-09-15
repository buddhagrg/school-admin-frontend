import * as React from 'react';
import { AddCircle, Circle, MoreVert } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography
} from '@mui/material';

import { AddEditPolicy } from './add-edit-policy';
import { AddPeopleToPolicy } from './add-people-to-policy';
import { leaveDefineReducer, LeaveDefineState } from '../leave-define-reducer';
import { PolicyStatus } from './policy-status';
import { LeavePolicy } from '../../../types';

const initialState: LeaveDefineState = {
  isPolicyActive: false,
  isAddEditPolicyModalOpen: false,
  isPolicyStatusModalOpen: false,
  isAddUserToPolicyModalOpen: false,
  title: '',
  bodyText: '',
  anchorElement: null,
  policyStatus: false,
  policyId: 0,
  policyName: ''
};

export const Overview = ({ leavePolicies }: { leavePolicies: LeavePolicy[] | undefined }) => {
  const [state, dispatch] = React.useReducer(leaveDefineReducer, initialState);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    policyId: number,
    policyName: string,
    isPolicyActive: boolean
  ) => {
    dispatch({
      type: 'SET_MENU_CLICK',
      payload: {
        anchorElement: event.currentTarget,
        policyId,
        policyName,
        isPolicyActive
      }
    });
  };
  const handleAnchorElementClose = () => {
    dispatch({ type: 'SET_MENU_CLOSE' });
  };
  const handlePolicyStatus = (policyStatus: boolean) => {
    dispatch({
      type: 'SET_POLICY_STATUS',
      payload: {
        policyStatus
      }
    });
  };
  const handleAddModalPolicy = () => {
    dispatch({ type: 'SET_ADD_POLICY_MODAL' });
  };
  const handleEditModalPolicy = () => {
    dispatch({ type: 'SET_EDIT_POLICY_MODAL' });
  };
  const handleAddPeopleModal = () => {
    dispatch({ type: 'SET_ADD_PEOPLE' });
  };
  const closeModal = () => {
    dispatch({ type: 'SET_CLOSE_MODAL' });
  };

  return (
    <>
      <Stack spacing={1} direction='row' sx={{ display: 'flex', mt: 2 }}>
        <Typography component='div' sx={{ fontSize: '18px', fontWeight: 500 }}>
          Overview
        </Typography>
        <Button
          size='small'
          variant='outlined'
          startIcon={<AddCircle />}
          onClick={handleAddModalPolicy}
        >
          Add New Policy
        </Button>
      </Stack>
      <Divider sx={{ my: '10px' }} />
      <Grid container spacing={3}>
        {leavePolicies &&
          leavePolicies.length > 0 &&
          leavePolicies.map(({ id, name, totalUsersAssociated, isActive }) => (
            <Grid item xs={12} md={4} key={id}>
              <Card variant='outlined'>
                <CardContent sx={{ backgroundColor: '#f3f6f999' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isActive ? (
                      <Circle sx={{ fontSize: '12px' }} color='success' />
                    ) : (
                      <Circle sx={{ fontSize: '12px' }} color='error' />
                    )}
                    <Typography
                      sx={{ fontSize: '18px', fontWeight: 500, margin: '5px' }}
                      gutterBottom
                    >
                      {name}
                    </Typography>
                    <div style={{ marginLeft: 'auto' }}>
                      <IconButton
                        aria-label='more'
                        id='long-button'
                        aria-haspopup='true'
                        onClick={(event) => handleClick(event, id, name, isActive)}
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        open={Boolean(state.anchorElement)}
                        anchorEl={state.anchorElement}
                        onClose={handleAnchorElementClose}
                        keepMounted
                      >
                        <MenuItem disabled={!state.isPolicyActive} onClick={handleEditModalPolicy}>
                          Edit Policy
                        </MenuItem>
                        <MenuItem
                          disabled={state.isPolicyActive}
                          onClick={() => handlePolicyStatus(true)}
                        >
                          Enable Policy
                        </MenuItem>
                        <MenuItem
                          disabled={!state.isPolicyActive}
                          onClick={() => handlePolicyStatus(false)}
                        >
                          Disable Policy
                        </MenuItem>
                        <MenuItem disabled={!state.isPolicyActive} onClick={handleAddPeopleModal}>
                          Add People
                        </MenuItem>
                      </Menu>
                    </div>
                  </Box>
                  <Typography sx={{ fontSize: '16px', color: 'text.secondary', mb: '20px' }}>
                    {totalUsersAssociated} people
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <AddEditPolicy
        policyId={state.policyId}
        policyName={state.policyName}
        title={state.title}
        isOpen={state.isAddEditPolicyModalOpen}
        closeModal={closeModal}
      />

      <PolicyStatus
        title={state.title}
        bodyText={state.bodyText}
        policyStatus={state.policyStatus}
        policyId={state.policyId}
        isOpen={state.isPolicyStatusModalOpen}
        closeModal={closeModal}
      />

      <AddPeopleToPolicy
        policyId={state.policyId}
        isOpen={state.isAddUserToPolicyModalOpen}
        closeModal={closeModal}
      />
    </>
  );
};
