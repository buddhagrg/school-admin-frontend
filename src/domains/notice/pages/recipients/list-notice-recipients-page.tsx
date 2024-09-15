import { Grid } from '@mui/material';
import { Info } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PageContentHeader } from '@/components/page-content-header';
import { NoticeRecipient, NoticeRecipientSchema } from '../../types';
import { ManageNoticeRecipients } from '../../components';
import { RecipientDataTable } from './notice-recipients-data-table';

const initialState = {
  roleId: 0,
  primaryDependentName: '',
  primaryDependentSelect: ''
};

export const ListNoticeRecipients = () => {
  const methods = useForm<NoticeRecipient>({
    defaultValues: initialState,
    resolver: zodResolver(NoticeRecipientSchema)
  });

  return (
    <>
      <PageContentHeader icon={<Info sx={{ mr: 1 }} />} heading='Notice Recipients Information' />
      <Grid container columnSpacing={5} rowSpacing={2}>
        <Grid item xs={12} md={4}>
          <ManageNoticeRecipients operation='Add' methods={methods} />
        </Grid>
        <Grid item xs={12} md={8}>
          <RecipientDataTable />
        </Grid>
      </Grid>
    </>
  );
};
