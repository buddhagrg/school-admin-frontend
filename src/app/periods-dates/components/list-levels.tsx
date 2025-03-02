import React, { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ERROR_MESSAGE } from '@/components/errors';
import { useGetAcademicLevelsQuery } from '@/app/levels-periods/levels-periods-api';
import { NameIdType } from '@/types';

type ListLevelsProps = {
  setSelectedLevelDetail: (levelDetail: NameIdType) => void;
};
const initialState = {
  id: 0,
  name: ''
};
export const ListLevels: React.FC<ListLevelsProps> = ({ setSelectedLevelDetail }) => {
  const { data, isLoading, isError, error } = useGetAcademicLevelsQuery();
  const selectedLevelDetail = Array.isArray(data?.academicLevels)
    ? data.academicLevels[0]
    : initialState;
  const [levelId, setSelectedLevelId] = useState<number>(initialState.id);

  useEffect(() => {
    if (selectedLevelDetail) {
      setSelectedLevelDetail(selectedLevelDetail);
      setSelectedLevelId(selectedLevelDetail.id);
    }
  }, [selectedLevelDetail, setSelectedLevelId, setSelectedLevelDetail]);

  if (isLoading) {
    return <>loading...</>;
  }
  if (isError) {
    return <>{getErrorMsg(error).message}</>;
  }
  if (!data || data?.academicLevels?.length <= 0) {
    return <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
  }

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    levelDetail: NameIdType
  ) => {
    setSelectedLevelId(levelDetail.id);
    setSelectedLevelDetail(levelDetail);
  };
  return (
    <List component='nav'>
      {data.academicLevels.map((item) => (
        <ListItemButton
          key={item.id}
          selected={levelId === item.id}
          onClick={(event) => handleListItemClick(event, item)}
        >
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
    </List>
  );
};
