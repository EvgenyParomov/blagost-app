import { FontAwesome } from '@expo/vector-icons';
import { Center, Heading, HStack, IconButton, Pressable } from 'native-base';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSelectDate } from './use-select-date';
import { useDateModal } from './use-date-modal';

type Props = {
  currentDayId?: DayId;
  setCurrentDayId?: (id?: DayId) => void;
};
export const DaySelect = ({ currentDayId, setCurrentDayId }: Props) => {
  const selectDate = useSelectDate(currentDayId, setCurrentDayId);
  const dateModal = useDateModal(selectDate.selectDay);

  return (
    <HStack bg="white" borderBottomWidth="1" borderBottomColor="gray.300">
      <IconButton
        icon={<FontAwesome size={30} name="angle-left" />}
        w="16"
        h="16"
        justifyContent="center"
        alignItems="center"
        disabled={selectDate.disablePrevDay}
        onPress={selectDate.selectPrevDay}
        opacity={selectDate.disablePrevDay ? 0 : 1}
      ></IconButton>
      <Center flexGrow="1">
        <Pressable onPress={dateModal.open}>
          <Heading size="md">
            {selectDate.currentDay?.date?.toFormat('EEEE dd.MM ', {
              locale: 'ru',
            })}
          </Heading>
        </Pressable>
      </Center>
      <IconButton
        icon={<FontAwesome size={30} name="angle-right" />}
        w="16"
        h="16"
        justifyContent="center"
        alignItems="center"
        disabled={selectDate.disableNextDay}
        onPress={selectDate.selectNextDay}
        opacity={selectDate.disableNextDay ? 0 : 1}
      ></IconButton>
      <DateTimePickerModal
        mode="date"
        date={selectDate.currentDay?.date.toJSDate()}
        isVisible={dateModal.show}
        onConfirm={dateModal.handleSelectDate}
        onCancel={dateModal.handleCloseModal}
        maximumDate={selectDate.maximumDate?.toJSDate()}
        minimumDate={selectDate.minimumDate?.toJSDate()}
        cancelTextIOS={'Отмена'}
        confirmTextIOS={'Выбрать'}
        themeVariant="light"
        locale="ru"
      />
    </HStack>
  );
};
