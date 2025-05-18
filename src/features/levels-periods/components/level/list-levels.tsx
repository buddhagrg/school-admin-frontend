import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';

import type { Level } from '../../types';
import { useGetAcademicLevelsQuery } from '../../levels-periods-api';
import { DisplayItem } from '../display-item';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { UpdateLevel } from './update-level';
import { DeleteLevel } from './delete-level';
import { Error, Loader, SubSoftText, TitleText } from '@/shared/components';

type LevelInitialStateType = {
  id: number;
  action: string;
  name: string;
};
const levelInitialState: LevelInitialStateType = {
  id: 0,
  action: '',
  name: ''
};
export const ListLevels = () => {
  const { data, isLoading, isError, error } = useGetAcademicLevelsQuery();
  const [state, setState] = useState<Level[]>([]);
  const [levelDetail, setLevelDetail] = useState<LevelInitialStateType>(levelInitialState);

  useEffect(() => {
    if (data?.academicLevels) {
      setState(data?.academicLevels);
    }
  }, [data?.academicLevels]);

  const onActionBtnClick = (index: number, action: string) => {
    const item = state[index];
    setLevelDetail({ action, id: item.id, name: item.name });
  };
  const closeModal = () => {
    setLevelDetail((prevState) => ({ ...prevState, action: '' }));
  };

  return (
    <>
      <Card>
        <CardHeader
          title={<TitleText text='Academic Levels' />}
          subheader={<SubSoftText text={`Manage your institution's academic levels`} />}
        />
        <CardContent>
          {isLoading ? <Loader /> : null}
          {isError ? <Error message={getErrorMsg(error).message} /> : null}
          {!isError &&
            state?.map(({ id, name, totalPeriods }, index) => (
              <DisplayItem
                onActionBtnClick={onActionBtnClick}
                heading={name}
                key={id}
                index={index}
                subHeading={`${totalPeriods} periods`}
              />
            ))}
        </CardContent>
      </Card>

      {levelDetail.action === 'edit' && (
        <UpdateLevel closeModal={closeModal} id={levelDetail.id} name={levelDetail.name} />
      )}

      {levelDetail.action === 'delete' && (
        <DeleteLevel closeModal={closeModal} id={levelDetail.id} name={levelDetail.name} />
      )}
    </>
  );
};
