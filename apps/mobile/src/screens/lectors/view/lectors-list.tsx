import { StyledProps, FlatList } from 'native-base';

export type PartialLector = {
  id: LectorId;
  fullName: string;
  avatarUrl?: string;
};

type Props = {
  sx?: StyledProps;
  data: PartialLector[];
  renderItem: (element: PartialLector) => JSX.Element;
};

export const LectorsList = ({ data, renderItem, sx }: Props) => {
  return (
    <FlatList
      numColumns={2}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => renderItem(item)}
      {...sx}
    />
  );
};
