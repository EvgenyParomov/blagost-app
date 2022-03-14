import { AxiosInstance } from 'axios';
import { createContext, ReactNode, useContext } from 'react';

const apiContext = createContext<AxiosInstance | undefined>(undefined);

export const useApi = () => {
  const api = useContext(apiContext);

  if (!api) {
    throw new Error('Api should provided before usage');
  }

  return api;
};

type ProviderProps = {
  api: AxiosInstance;
  children: ReactNode;
};

export const ApiProvider = ({ children, api }: ProviderProps) => {
  return <apiContext.Provider value={api}>{children}</apiContext.Provider>;
};
