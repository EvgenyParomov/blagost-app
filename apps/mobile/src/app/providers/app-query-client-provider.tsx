import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "react-query";

const queryClient = new QueryClient({});

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(state.isConnected ?? undefined);
  });
});

type Props = {
  children?: ReactNode;
};
export const AppQueryClientProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
