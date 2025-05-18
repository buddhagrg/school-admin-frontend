import { useEffect, useState } from 'react';
import { FilterAltOutlined } from '@mui/icons-material';
import { Box, Button, Chip } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LeaveRequestFilter } from './leave-request-filter';
import { LeaveRequestTable } from './leave-request-table';
import { filterState } from './filter-state';
import { type LeaveRequestFilterProps, LeaveRequestFilterSchema } from '../../types';
import { PageContentHeader } from '@/shared/components';

export const LeaveHistory = () => {
  const [appliedFilter, setAppliedFilter] = useState<LeaveRequestFilterProps>(filterState);
  const [filterModal, setFilterModal] = useState(false);
  const methods = useForm<LeaveRequestFilterProps>({
    defaultValues: filterState,
    resolver: zodResolver(LeaveRequestFilterSchema)
  });
  const filter = methods.watch();
  const filterLength = Object.values(filter).filter((item) => item).length;

  useEffect(() => {
    methods.reset(filterState);
  }, [methods]);

  const toggleFilterModal = () => {
    setFilterModal(!filterModal);
  };
  const searchLeaves = () => {
    setAppliedFilter(filter);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PageContentHeader
          title='Leave History'
          subtitle='View and track all your leave requests'
        />
        <Box sx={{ ml: 'auto' }}>
          <Button
            color='inherit'
            size='small'
            variant='outlined'
            startIcon={<FilterAltOutlined fontSize='small' />}
            onClick={toggleFilterModal}
          >
            {filterModal ? 'Hide' : 'Show'} Filters
            {filterLength > 0 && (
              <Chip label={filterLength} color='primary' size='small' sx={{ ml: 1 }} />
            )}
          </Button>
        </Box>
      </Box>
      <Box mt={3} />
      {filterModal && <LeaveRequestFilter methods={methods} searchLeaves={searchLeaves} />}
      <Box mt={3} />
      <LeaveRequestTable filter={appliedFilter!} />
    </>
  );
};
