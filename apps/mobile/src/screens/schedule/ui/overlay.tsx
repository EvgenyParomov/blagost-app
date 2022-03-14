import { Box, Spinner } from "native-base";

export const Overlay = () => {
  return (
    <Box
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
      }}
      bg="white"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="lg" />
    </Box>
  );
};
