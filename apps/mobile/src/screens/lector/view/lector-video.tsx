import { vw } from '@blagost/mobile/shared/lib/native-std';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { Box, StyledProps } from 'native-base';
import React, { useRef } from 'react';

type Props = {
  sx?: StyledProps;
  videoUrl: string;
};

export const LectorVideo = ({ sx, videoUrl }: Props) => {
  const ref = useRef<Video>();
  return (
    <Box borderRadius="md" overflow={'hidden'} {...sx}>
      <VideoPlayer
        defaultControlsVisible
        style={{ height: (9 / 16) * vw(100) }}
        videoProps={{
          resizeMode: Video.RESIZE_MODE_CONTAIN,

          // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
          source: {
            uri: videoUrl,
          },
          ref: ref as any,
        }}
      />
    </Box>
  );
};
