import axios from 'axios';
import React, { ReactNode } from 'react';
import Constants from 'expo-constants';
import { ApiProvider } from '@blagost/api';
import { replaceLocalHost } from '@blagost/mobile/shared/lib/native-std';

const { manifest } = Constants;

const getApiUrl = () => {
  const isDev = manifest?.packagerOpts?.dev;
  if (isDev) {
    return `http://localhost:3333/api`;
  }
  return 'http://176.119.159.59:3333/api';
};

const apiInstance = axios.create({
  baseURL: replaceLocalHost(getApiUrl()),
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json;charset=utf-8',
  },
});

type Props = {
  children?: ReactNode;
};
export const AppApiProvider = ({ children }: Props): JSX.Element => {
  return <ApiProvider api={apiInstance}>{children}</ApiProvider>;
};
