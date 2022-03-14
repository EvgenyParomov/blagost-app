import {
  PartialFestival,
  partialFestivalToUpdateDto,
} from '@blagost/admin/entities/festival';
import { LoadingButton } from '@mui/lab';
import { useMutation } from 'react-query';
import { useGetFestivalInfo } from './festival-dialog';
import { useUpdateFestivalMutation } from './queries';

type Props = {
  festival: PartialFestival;
};
export function UpdateFestivalButton({ festival }: Props) {
  const getNewFestival = useGetFestivalInfo();
  const updateMutation = useMutation({
    ...useUpdateFestivalMutation(),
  });

  const handleCreate = async () => {
    const newFestival = await getNewFestival({
      defaultFestival: festival,
    });
    updateMutation.mutateAsync(partialFestivalToUpdateDto(newFestival));
  };

  return (
    <LoadingButton loading={updateMutation.isLoading} onClick={handleCreate}>
      Редактировать
    </LoadingButton>
  );
}
