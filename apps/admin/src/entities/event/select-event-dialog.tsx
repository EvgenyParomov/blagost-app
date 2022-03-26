import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Autocomplete,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { DialogViewProps, createDialog } from 'react-imperative-dialog';
import { useEffect } from 'react';

type Option = { id: EventId; label: string };
type FormData = { event: Option };

type DialogSettings = {
  params: {
    options: Option[];
  };
  result: EventId;
};

const SelectEventModal: React.FC<DialogViewProps<DialogSettings>> = ({
  isOpen,
  onResult,
  onClose,
  options,
}) => {
  const { handleSubmit, control, reset } = useForm<FormData>();

  useEffect(() => {
    reset();
  }, [isOpen]);

  const onSubmit = (data: FormData) => {
    onResult(data.event.id);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Выбор мероприятия</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, pb: 30 }}>
          <Controller
            name="event"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                disablePortal
                options={options}
                value={field.value ?? null}
                onChange={(_, value) => field.onChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ width: 500 }}
                    label="Мероприятие"
                  />
                )}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отменить</Button>
        <Button onClick={handleSubmit(onSubmit)}>Выбрать</Button>
      </DialogActions>
    </Dialog>
  );
};

export const {
  DialogProvider: SelectEventProvider,
  useDialogAsync: useSelectEvent,
} = createDialog({
  DialogView: SelectEventModal,
  defaultParams: { options: [] },
});
