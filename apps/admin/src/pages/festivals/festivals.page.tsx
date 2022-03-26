import {
  FestivalCard,
  useFestivalsQuery,
  PartialFestival,
  dtoToPartialFestival,
} from '@blagost/admin/entities/festival';
import {
  CreateFestivalButton,
  UpdateFestivalButton,
  DeleteFestivalButton,
} from '@blagost/admin/features/manage-festivals';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export function FestivalsPage() {
  const Router = useRouter();
  const { data: festivals = [], isLoading } = useFestivals();
  return (
    <Box>
      <Typography variant="h1" component="h1">
        Фестивали
      </Typography>
      <Box sx={{ mb: 2 }}>
        <CreateFestivalButton />
      </Box>
      <Box display="flex" flexWrap="wrap">
        {festivals.map((festival) => (
          <FestivalCard
            key={festival.id}
            {...festival}
            onClick={() => {
              Router.push(`/festivals/${encodeURIComponent(festival.id)}`);
            }}
            actions={
              <>
                <UpdateFestivalButton festival={festival} />
                <DeleteFestivalButton festival={festival} />
              </>
            }
          />
        ))}
      </Box>
    </Box>
  );
}

function useFestivals() {
  return useQuery({
    ...useFestivalsQuery(),
    select: (festivals) => {
      return festivals.map(dtoToPartialFestival);
    },
  });
}
