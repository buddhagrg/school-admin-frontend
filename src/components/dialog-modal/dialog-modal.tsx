import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

type DialogModalProps = {
  isSaving: boolean;
  actionFooterCancelText?: string;
  actionFooterSaveText?: string;
  isModalClosedOnOutClick?: boolean;
  isOpen: boolean;
  titleText?: string;
  contextText?: React.ReactNode;
  closeModal: () => void;
  children?: React.ReactNode;
  handleSave: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

// function PaperComponent(props: PaperProps) {
//   return (
//     <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
//       <Paper {...props} />
//     </Draggable>
//   );
// }
export const DialogModal: React.FC<DialogModalProps> = ({
  isSaving,
  actionFooterCancelText,
  actionFooterSaveText,
  isModalClosedOnOutClick = true,
  isOpen,
  titleText,
  contextText,
  closeModal,
  children,
  handleSave
}) => {
  const handleClose = () => {
    {
      Boolean(isModalClosedOnOutClick) && closeModal();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth='xs'
      // PaperComponent={PaperComponent}
    >
      <DialogTitle id='draggable-dialog-title'>{titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>{contextText}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button type='button' size='small' variant='contained' color='error' onClick={closeModal}>
          {actionFooterCancelText ?? 'Cancel'}
        </Button>
        <LoadingButton
          loading={isSaving}
          type='button'
          size='small'
          variant='contained'
          onClick={handleSave}
        >
          {actionFooterSaveText ?? 'Save'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
