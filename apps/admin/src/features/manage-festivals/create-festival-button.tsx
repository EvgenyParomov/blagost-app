import { partialFestivalToCreateDto } from '@blagost/admin/entities/festival';
import { LoadingButton } from '@mui/lab';
import { useMutation } from 'react-query';
import { useGetFestivalInfo } from './festival-dialog';
import { useCreateFestivalMutation } from './queries';

type Props = {};
export function CreateFestivalButton({}: Props) {
  const getNewFestival = useGetFestivalInfo();
  const createMutation = useMutation({
    ...useCreateFestivalMutation(),
  });

  const handleCreate = async () => {
    const festival = await getNewFestival();
    createMutation.mutateAsync(partialFestivalToCreateDto(festival));
  };

  return (
    <LoadingButton loading={createMutation.isLoading} onClick={handleCreate}>
      Создать фестиваль
    </LoadingButton>
  );
}
