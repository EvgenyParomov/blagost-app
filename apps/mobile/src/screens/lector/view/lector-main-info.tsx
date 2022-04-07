import { AspectRatio, Box, StyledProps, Image, Text } from 'native-base';

type Props = {
  fullName: string;
  avatarUrl: string;
  description?: string;
  sx?: StyledProps;
};

export const LectorMainInfo = ({
  avatarUrl,
  fullName,
  description,
  sx,
}: Props) => {
  return (
    <Box {...sx}>
      <AspectRatio ratio={{ base: 1 }} w="1/2" alignSelf="center">
        <Image source={{ uri: avatarUrl }} borderRadius="md" />
      </AspectRatio>
      <Text textAlign="center" mt="3" fontSize="3xl">
        {fullName}
      </Text>
      {description && (
        <Box mt="2" pl="2" pr="4" flexDirection="row">
          <Box
            bg="gray.600"
            opacity="0.2"
            w="10px"
            mr="4"
            borderRadius="xs"
          ></Box>
          <Text
            textBreakStrategy="balanced"
            color="gray.600"
            mt="2"
            mb="2"
            fontSize="md"
          >
            {description}
          </Text>
        </Box>
      )}
    </Box>
  );
};
