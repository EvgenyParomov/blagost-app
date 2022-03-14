import axios from 'axios';
import React, { ReactNode } from 'react';
import Constants from 'expo-constants';
import { ApiProvider } from '@blagost/api';

const { manifest } = Constants;

const getApiUrl = () => {
  const isDev = manifest?.packagerOpts?.dev;
  const api = manifest?.debuggerHost?.split(`:`)?.shift() ?? '/';

  if (isDev) {
    return `http://${api}:3333/api`;
  }

  return '/';
};

const apiInstance = axios.create({
  baseURL: getApiUrl(),
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
