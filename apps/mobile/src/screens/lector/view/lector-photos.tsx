import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { Box, StyledProps, AspectRatio, Image } from 'native-base';
import { vw } from '@blagost/mobile/shared/lib/native-std';

type Props = {
  sx?: StyledProps;
  photos: string[];
};

export const LectorPhotos = ({ sx, photos }: Props) => {
  const renderPhoto = (carouselItem: { item: string; index: number }) => (
    <AspectRatio width={vw(60)} ratio={{ base: 1 }} alignSelf="center">
      <Image source={{ uri: carouselItem.item }} borderRadius="md" />
    </AspectRatio>
  );

  return (
    <Box {...sx}>
      <Carousel
        sliderWidth={vw(100)}
        itemWidth={vw(60)}
        data={photos}
        renderItem={renderPhoto}
      />
    </Box>
  );
};
