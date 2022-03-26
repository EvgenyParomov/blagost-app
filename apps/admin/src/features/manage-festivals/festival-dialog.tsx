import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/lab';
import { useForm, Controller } from 'react-hook-form';
import { DialogViewProps, createDialog } from 'react-imperative-dialog';
import { DateTime } from 'luxon';
import { useEffect } from 'react';

import { createId } from '@blagost/std';
import { PartialFestival } from '@blagost/admin/entities/festival';

const timezones = new Array(24)
  .fill('UTC')
  .map((_, i) => `UTC${i > 10 ? '+' : ''}${i - 11}`);

const formDataToPartialFestival = (
  formData: FestivalFormData,
  id = createId<FestivalId>()
): PartialFestival => ({
  id,
  ...formData,
});

export type FestivalFormData = {
  name: string;
  start: DateTime;
  end: DateTime;
  timezone: string;
};

type DialogSettings = {
  params: {
    defaultFestival?: PartialFestival;
  };
  result: PartialFestival;
};

const FestivalModal: React.FC<DialogViewProps<DialogSettings>> = ({
  isOpen,
  onResult,
  onClose,
  defaultFestival,
}) => {
  const { handleSubmit, control, reset } = useForm<FestivalFormData>({
    defaultValues: defaultFestival,
  });

  useEffect(() => {
    if (defaultFestival) {
      reset(defaultFestival);
    }
  }, [defaultFestival]);

  const handleData = (data: FestivalFormData) => {
    onResult(formDataToPartialFestival(data, defaultFestival?.id));
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {defaultFestival ? 'Редактирование фестиваля' : 'Добавление фестиваля'}
      </DialogTitle>
      <DialogContent>
        <Box>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                label="Название"
                type="email"
                {...field}
              />
            )}
          />
          <Controller
            name="timezone"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                label="Часовой пояс"
                select
                {...field}
              >
                {timezones.map((t) => (
                  <MenuItem value={t}>{t}</MenuItem>
                ))}
              </TextField>
            )}
          />
          {!defaultFestival && (
            <>
              <Controller
                name="start"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Начало фестиваля"
                    value={field.value}
                    onChange={field.onChange}
                    renderInput={(params) => (
                      <TextField margin="normal" fullWidth {...params} />
                    )}
                  />
                )}
              />
              <Controller
                name="end"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Конец фестиваля"
                    value={field.value}
                    onChange={field.onChange}
                    renderInput={(params) => (
                      <TextField margin="normal" fullWidth {...params} />
                    )}
                  />
                )}
              />
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отменить</Button>
        <Button onClick={handleSubmit(handleData)}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export const {
  DialogProvider: FestivalDialogProvider,
  useDialogAsync: useGetFestivalInfo,
} = createDialog({
  DialogView: FestivalModal,
  defaultParams: {},
});
