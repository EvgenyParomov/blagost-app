import { Modal, StyledProps, Box, Text, AspectRatio, Image } from 'native-base';
import { Place } from '../types';

type Props = {
  sx?: StyledProps;
  isOpen?: boolean;
  onClose?: () => void;
  place: Place;
};

export const PlaceModal = ({ sx, place, isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <Modal.Content {...sx}>
        <Modal.CloseButton />
        <Modal.Header _text={{ fontSize: 'xl' }}>{place.name}</Modal.Header>
        <Modal.Body>
          {place.howGetDescription && (
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Как добраться
              </Text>
              <Text fontSize="md">
                {place.howGetDescription.replace(/\s+/g, ' ')}
              </Text>
            </Box>
          )}
          {place.mapPhoto && (
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb="1">
                Карта
              </Text>
              <AspectRatio flexGrow="1" ratio={1}>
                <Image size="full" source={{ uri: place.mapPhoto }} />
              </AspectRatio>
            </Box>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
