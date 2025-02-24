import { FC, MouseEvent, ReactNode } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type DialogModalProps = {
  isSaving: boolean;
  actionFooterCancelText?: string;
  actionFooterSaveText?: string;
  isModalClosedOnOutClick?: boolean;
  isOpen: boolean;
  titleText?: string;
  contextText?: ReactNode;
  closeModal: () => void;
  children?: ReactNode;
  handleSave: (event: MouseEvent<HTMLButtonElement>) => void;
};

// function PaperComponent(props: PaperProps) {
//   return (
//     <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
//       <Paper {...props} />
//     </Draggable>
//   );
// }
export const DialogModal: FC<DialogModalProps> = ({
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
        <Box>{contextText}</Box>
        {children}
      </DialogContent>
      <DialogActions>
        <Button type='button' size='small' variant='contained' color='error' onClick={closeModal}>
          {actionFooterCancelText ?? 'Cancel'}
        </Button>
        <Button
          loading={isSaving}
          loadingPosition='start'
          type='button'
          size='small'
          variant='contained'
          onClick={handleSave}
        >
          {actionFooterSaveText ?? 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
