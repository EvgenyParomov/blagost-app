import axios from 'axios';
import { ReactNode } from 'react';
import { ApiProvider } from '@blagost/api';

const apiInstance = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json;charset=utf-8',
  },
});

type Props = {
  children?: ReactNode;
};
export const AppApiProvider = ({ children }: Props) => {
  return <ApiProvider api={apiInstance}>{children}</ApiProvider>;
};
