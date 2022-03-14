import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { DialogViewProps, createDialog } from 'react-imperative-dialog';

type DialogSettings = {
  params: {
    title?: string;
    description?: string;
    acceptText?: string;
    cancelText?: string;
  };
};

function ConfirmationModal({
  isOpen,
  onClose,
  onResult,
  acceptText,
  cancelText,
  description,
  title,
}: DialogViewProps<DialogSettings>) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {description && (
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          {cancelText}
        </Button>
        <Button onClick={onResult} autoFocus>
          {acceptText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export const {
  useDialogAsync: useConfirmation,
  DialogProvider: ConfirmationProvider,
} = createDialog<DialogSettings>({
  DialogView: ConfirmationModal,
  defaultParams: {
    title: 'Подтвердите действие',
    acceptText: 'Подтвердить',
    cancelText: 'Отменить',
  },
});
