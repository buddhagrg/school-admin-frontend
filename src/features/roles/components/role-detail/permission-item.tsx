import React from 'react';
import { Box, Checkbox, Divider, FormControlLabel, Grid2 } from '@mui/material';
import { blue } from '@mui/material/colors';

import type { ExtendedPermission } from '../../types';
import { COLORS } from '@/theme/custom-colors';
import { useRolePermission } from '../../context/role-provider';
import { HeadingText, SubHardText, SubSoftText } from '@/shared/components';

type PermissionItemProps = {
  item: ExtendedPermission;
};
export const PermissionItem: React.FC<PermissionItemProps> = ({ item }) => {
  const {
    id: parentPermissionId,
    name: parentPermissionName,
    isPermissionAvailable: isParentPermissionAvailable,
    subMenus
  } = item;
  const { dispatch } = useRolePermission();

  const handleParentPermissionChange = () => {
    dispatch({ type: 'TOGGLE_PARENT_PERMISSION', payload: parentPermissionId });
  };

  const parentPermissionElement = () => (
    <FormControlLabel
      label={<SubHardText text={`Access ${parentPermissionName}`} color={blue[700]} />}
      control={
        <Checkbox
          checked={isParentPermissionAvailable}
          value={isParentPermissionAvailable}
          onChange={handleParentPermissionChange}
        />
      }
    />
  );

  const handleChildPermissionChange = (id: number) => {
    dispatch({ type: 'TOGGLE_CHILD_PERMISSION', payload: { parentId: parentPermissionId, id } });
  };

  const childPermissionElement = (id: number, isPermissionAvailable: boolean, name: string) => {
    return (
      <FormControlLabel
        label={isPermissionAvailable ? <SubHardText text={name} /> : <SubSoftText text={name} />}
        control={
          <Checkbox
            checked={isPermissionAvailable}
            value={isPermissionAvailable}
            onChange={() => handleChildPermissionChange(id)}
          />
        }
      />
    );
  };

  return (
    <Box sx={{ mb: 2, border: `1px solid ${COLORS.border}`, p: 2, borderRadius: '5px' }}>
      <HeadingText text={parentPermissionName} />
      <Box mt={1} />
      <Box
        sx={{
          display: 'flex',
          bgcolor: blue[50],
          alignItems: 'center',
          gap: 1,
          p: 1,
          borderRadius: '5px'
        }}
      >
        {parentPermissionElement()}
      </Box>
      <Divider component='hr' sx={{ mt: 1 }} />
      <Box mt={1} />
      <Grid2 container>
        {subMenus?.map(({ id, name, isPermissionAvailable }) => (
          <Grid2 size={{ xs: 12, md: 6 }} key={id}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {childPermissionElement(id, isPermissionAvailable!, name)}
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};
