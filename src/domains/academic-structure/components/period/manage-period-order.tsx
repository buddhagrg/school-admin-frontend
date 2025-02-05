import * as React from 'react';
import { DialogModal } from '@/components/dialog-modal';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Period } from '../../types';
import { PeriodItem } from './period-item';
import { toast } from 'react-toastify';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useUpdatePeriodOrderMutation } from '../../api';
import { Chip, List } from '@mui/material';

type ManagePeriodOrderProps = {
  closeModal: () => void;
  periods: Period[];
  academicLevelId: number;
};
export const ManagePeriodOrder: React.FC<ManagePeriodOrderProps> = ({
  closeModal,
  periods,
  academicLevelId
}) => {
  const [periodList, setPeriodList] = React.useState<Period[]>([]);
  const [updatePeriodOrder, { isLoading: isUpdating }] = useUpdatePeriodOrderMutation();

  React.useEffect(() => {
    if (periods && periods.length > 0) {
      setPeriodList(periods);
    }
  }, [periods]);

  const getPeriodPosition = (id: number) => periodList.findIndex((p) => p.id === id);
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id === over?.id) return;

    setPeriodList((prevPeriods) => {
      const oldIndex = getPeriodPosition(Number(active.id));
      const newIndex = getPeriodPosition(Number(over?.id));
      const res = arrayMove(prevPeriods, oldIndex, newIndex).map((p, index) => ({
        ...p,
        sortOrder: index + 1
      }));
      return res;
    });
  };
  const handleSave = async () => {
    try {
      const payload = {
        academicLevelId,
        periods: periodList
      };
      const result = await updatePeriodOrder(payload).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      titleText='Manage Period Order'
      contextText={<Chip label='Drag items vertically to reorder' color='primary' />}
      isSaving={isUpdating}
      closeModal={closeModal}
      handleSave={handleSave}
    >
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <SortableContext items={periods} strategy={verticalListSortingStrategy}>
          <List dense>
            {periodList?.map(({ id, name }) => <PeriodItem id={id} name={name} key={id} />)}
          </List>
        </SortableContext>
      </DndContext>
    </DialogModal>
  );
};
