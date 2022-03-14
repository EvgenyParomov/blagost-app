import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Animated, LayoutChangeEvent, ViewStyle } from "react-native";

type Props = {
  children?: ReactNode;
  style?: ViewStyle;
  isOpen?: boolean;
};

export const Collapsed = ({ children, isOpen, style }: Props) => {
  const { height, handleLayout } = useBodyHeight();

  const isReady = !!height;
  const animatedHeight = useAnimatedHeight(isOpen ? height ?? 0 : 0);

  return (
    <Animated.View
      style={{
        height: isReady ? animatedHeight : "auto",
        overflow: "hidden",
        opacity: isReady ? 1 : 0,
        position: isReady ? undefined : "absolute",
        ...style,
      }}
      onLayout={isReady ? undefined : handleLayout}
    >
      {children}
    </Animated.View>
  );
};

function useAnimatedHeight(height: number) {
  const isFirst = useRef(true);
  const animatedHeight = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    Animated.timing(animatedHeight, {
      duration: 300,
      toValue: height,
      useNativeDriver: false,
    }).start();
  }, [height]);

  return animatedHeight;
}

function useBodyHeight(onReady?: () => void) {
  const [height, setHeight] = useState<number>();

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    if (height) {
      setHeight(height);
    }
  }, []);

  useEffect(() => {
    if (height) {
      onReady?.();
    }
  }, [height]);

  return {
    handleLayout,
    height,
  };
}
