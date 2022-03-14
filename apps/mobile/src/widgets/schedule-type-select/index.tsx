import { Box, Center, Pressable } from "native-base";
import { Animated } from "react-native";

export enum ScheduleType {
  Main = "Main",
  Extra = "Extra",
}

const scheduleLabels = {
  [ScheduleType.Main]: "Основное",
  [ScheduleType.Extra]: "Дополнительное",
};

type Props = {
  scheduleType: ScheduleType;
  setScheduleType: (type: ScheduleType) => void;
};
export const ScheduleTypeSelect = ({
  scheduleType,
  setScheduleType,
}: Props) => {
  const renderTab = (type: ScheduleType) => {
    const color = type === scheduleType ? "#000" : "#1f2937";
    const borderColor = type === scheduleType ? "cyan.500" : "coolGray.200";
    return (
      <Box borderBottomWidth="3" borderColor={borderColor} flexGrow="1">
        <Pressable onPress={() => setScheduleType(type)}>
          <Center my="3">
            <Animated.Text style={{ color }}>
              {scheduleLabels[type]}
            </Animated.Text>
          </Center>
        </Pressable>
      </Box>
    );
  };

  return (
    <Box flexDirection="row" bg={"white"}>
      {Object.values(ScheduleType).map(renderTab)}
    </Box>
  );
};
