import React, { MouseEvent, ReactNode } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Close } from '@mui/icons-material';

import { SubSoftText } from '../sub-soft-text';

type DialogModalProps = {
  isSaving?: boolean;
  actionFooterCancelText?: string;
  actionFooterSaveText?: string;
  isModalClosedOnOutClick?: boolean;
  isOpen: boolean;
  titleText?: string;
  contextText?: ReactNode;
  closeModal: () => void;
  children?: ReactNode;
  handleSave?: (event: MouseEvent<HTMLButtonElement>) => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showDialogTitle?: boolean;
  showCancelDialogAction?: boolean;
  showSaveDialogAction?: boolean;
  bgColor?: string;
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
  handleSave,
  size = 'xs',
  showDialogTitle = true,
  showCancelDialogAction = true,
  showSaveDialogAction = true,
  bgColor
}) => {
  const handleClose = () => {
    if (isModalClosedOnOutClick) {
      closeModal();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth={size}
      // PaperComponent={PaperComponent}
    >
      {showDialogTitle && (
        <DialogTitle id='draggable-dialog-title'>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mr: 1 }}>
              {titleText}
              {contextText && <SubSoftText text={contextText} />}
            </Box>
            <Box flexGrow={1} />
            <Close
              sx={{
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
              fontSize='small'
              onClick={closeModal}
            />
          </Box>
        </DialogTitle>
      )}
      <DialogContent sx={{ bgcolor: bgColor, pt: 0 }}>{children}</DialogContent>
      <DialogActions>
        {showCancelDialogAction && (
          <Button type='button' size='small' variant='contained' color='error' onClick={closeModal}>
            {actionFooterCancelText ?? 'Cancel'}
          </Button>
        )}
        {showSaveDialogAction && (
          <Button
            disabled={isSaving}
            type='button'
            size='small'
            variant='contained'
            onClick={handleSave}
          >
            {actionFooterSaveText ?? 'Save'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
