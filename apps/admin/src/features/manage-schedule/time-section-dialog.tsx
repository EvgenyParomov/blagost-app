import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  MenuItem,
} from '@mui/material';
import { TimePicker } from '@mui/lab';
import { useForm, Controller } from 'react-hook-form';
import { DialogViewProps, createDialog } from 'react-imperative-dialog';
import { DateTime } from 'luxon';
import { useEffect } from 'react';

import { createId } from '@blagost/std';
import { TimeSection, timeSectionTypes } from '@blagost/admin/entities/day';
import { Dto } from '@blagost/api';

const timeSectionToFormData = ({
  name,
  start,
  end,
  type,
}: TimeSection): TimeSectionFormData => ({
  name,
  start,
  end,
  type,
});

const formDataToUpsertDto = (
  { start, end, name, type }: TimeSectionFormData,
  dayId: DayId,
  timeSectionId = createId<TimeSectionId>()
): Dto.UpsertTimeSectionDto => ({
  id: timeSectionId,
  name,
  type,
  startTime: start.toISOTime(),
  endTime: end.toISOTime(),
  dayId,
});

export type TimeSectionFormData = {
  start: DateTime;
  end: DateTime;
  name: string;
  type: TimeSectionType;
};

type DialogSettings = {
  params: {
    defaultTimeSection?: TimeSection;
    dayId: DayId;
  };
  result: Dto.UpsertTimeSectionDto;
};

const TimeSectionModal: React.FC<DialogViewProps<DialogSettings>> = ({
  isOpen,
  onResult,
  onClose,
  defaultTimeSection,
  dayId,
}) => {
  const { handleSubmit, control, reset } = useForm<TimeSectionFormData>({
    defaultValues: defaultTimeSection
      ? timeSectionToFormData(defaultTimeSection)
      : undefined,
  });

  useEffect(() => {
    if (defaultTimeSection) {
      reset(timeSectionToFormData(defaultTimeSection));
    } else {
      reset();
    }
  }, [defaultTimeSection]);

  const handleData = (data: TimeSectionFormData) => {
    onResult(formDataToUpsertDto(data, dayId, defaultTimeSection?.id));
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {defaultTimeSection ? 'Редактирование секции' : 'Добавление секции'}
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
            name="type"
            control={control}
            rules={{ required: true }}
            defaultValue="many"
            render={({ field }) => (
              <TextField
                margin="normal"
                select
                fullWidth
                label="Тип"
                {...field}
              >
                {Object.entries(timeSectionTypes).map(([value, label]) => (
                  <MenuItem value={value}>{label}</MenuItem>
                ))}
              </TextField>
            )}
          />
          <>
            <Controller
              name="start"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TimePicker
                  label="Начало секции"
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
              rules={{ required: true }}
              render={({ field }) => (
                <TimePicker
                  label="Конец секции"
                  value={field.value}
                  onChange={field.onChange}
                  renderInput={(params) => (
                    <TextField margin="normal" fullWidth {...params} />
                  )}
                />
              )}
            />
          </>
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
  DialogProvider: TimeSectionDialogProvider,
  useDialogAsync: useGetTimeSectionDto,
} = createDialog({
  DialogView: TimeSectionModal,
  defaultParams: {
    dayId: createId<DayId>(),
  },
});
