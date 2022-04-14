import Carousel from 'react-native-snap-carousel';
import {
  Box,
  StyledProps,
  AspectRatio,
  Image,
  Text,
  VStack,
} from 'native-base';
import { vw } from '@blagost/mobile/shared/lib/native-std';
import VideoPlayer from 'expo-video-player';
import { Video } from 'expo-av';
import React from 'react';

type Props = {
  sx?: StyledProps;
  photos?: string[];
  video?: string;
  description?: string;
};

export const EventMoreInfo = ({ sx, description, photos, video }: Props) => {
  const renderLector = (carouselItem: { item: string; index: number }) => (
    <AspectRatio width={vw(80)} ratio={{ base: 4 / 3 }} alignSelf="center">
      <Image source={{ uri: carouselItem.item }} borderRadius="md" />
    </AspectRatio>
  );

  if (!description && !video && !photos?.length) return null;

  return (
    <Box {...sx}>
      <Text px="4" textAlign="center" fontSize="xl">
        Описание мероприятия
      </Text>
      <VStack space="6">
        {description && (
          <Box mt="2" px="8" flexDirection="row">
            <Box
              bg="gray.600"
              opacity="0.2"
              w="10px"
              mr="4"
              borderRadius="xs"
            ></Box>
            <Text
              flexShrink="1"
              textBreakStrategy="balanced"
              color="gray.600"
              mt="2"
              mb="2"
              fontSize="md"
            >
              {description.replace(/\s+/g, ' ')}
            </Text>
          </Box>
        )}
        {video && (
          <Box borderRadius="md" alignSelf="center" overflow="hidden">
            <VideoPlayer
              defaultControlsVisible
              style={{ height: (9 / 16) * vw(90), width: vw(90) }}
              videoProps={{
                resizeMode: Video.RESIZE_MODE_CONTAIN,
                source: {
                  uri: video,
                },
              }}
            />
          </Box>
        )}
        {Boolean(photos?.length) && (
          <Box>
            <Carousel
              sliderWidth={vw(100)}
              itemWidth={vw(80)}
              data={photos ?? []}
              renderItem={renderLector}
            />
          </Box>
        )}
      </VStack>
    </Box>
  );
};
