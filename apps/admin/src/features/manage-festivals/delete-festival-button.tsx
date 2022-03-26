import { PartialFestival } from '@blagost/admin/entities/festival';
import { useConfirmation } from '@blagost/admin/shared/ui/confirmation';
import { LoadingButton } from '@mui/lab';
import { useMutation } from 'react-query';
import { useDeleteFestivalMutation } from './queries';

type Props = {
  festival: PartialFestival;
};

export function DeleteFestivalButton({ festival }: Props) {
  const openConfirmation = useConfirmation();
  const deleteMutation = useMutation({
    ...useDeleteFestivalMutation(),
  });

  const handleClick = async () => {
    await openConfirmation({
      description: `Вы действительно хотите удалить фестиваль ${festival.name}?`,
      acceptText: 'Удалить',
    });
    deleteMutation.mutate(festival);
  };

  return (
    <LoadingButton onClick={handleClick} color="error">
      Удалить
    </LoadingButton>
  );
}
