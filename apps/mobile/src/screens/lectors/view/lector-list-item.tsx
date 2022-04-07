import { vw } from '@blagost/mobile/shared/lib/native-std';
import { StyledProps, Image, Text, Pressable, AspectRatio } from 'native-base';
import React from 'react';

type Props = {
  sx?: StyledProps;
  id: LectorId;
  fullName: string;
  avatarUrl?: string;
  onPress?: () => void;
};

export const PartialLectorView = ({
  fullName,
  avatarUrl,
  onPress,
  sx,
}: Props) => {
  return (
    <Pressable p={'10px'} onPress={onPress} _pressed={{ opacity: 0.8 }} {...sx}>
      <AspectRatio ratio={{ base: 1 }} width={vw(50) - 20}>
        <Image source={{ uri: avatarUrl }} borderRadius="md" />
      </AspectRatio>
      <Text mt="1" fontSize="xl" width={vw(50) - 20}>
        {fullName}
      </Text>
    </Pressable>
  );
};
