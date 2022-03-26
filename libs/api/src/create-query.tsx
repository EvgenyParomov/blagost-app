import { useQueryClient } from 'react-query';
import { AxiosInstance } from 'axios';
import { useApi } from './api-context';

export function createUseQuery<A extends any[], R = void>(config: {
  key: (...args: A) => any;
  fetcher: (api: AxiosInstance, ...args: A) => R;
}) {
  return (...args: A) => {
    const api = useApi();
    return {
      queryKey: config.key(...args),
      queryFn: () => config.fetcher(api, ...args),
    };
  };
}

export function createUseMutation<P, R = void>(config: {
  fetcher: (api: AxiosInstance, params: P) => R;
  invalidateKeys?: ((params: P) => any)[];
}) {
  return () => {
    const api = useApi();
    const queryClient = useQueryClient();
    return {
      mutationFn: (params: P) => config.fetcher(api, params),
      onSettled: (_: any, __: any, params: P) => {
        config?.invalidateKeys?.forEach((getKey) => {
          queryClient.invalidateQueries(getKey(params));
        });
      },
    };
  };
}

export function createUseQueryOptional<A extends any[], R = void>(config: {
  key: (...args: A) => any[];
  fetcher: (api: AxiosInstance, ...args: RequiredTuple<A>) => R;
}): (...args: A) => {
  queryKey: any[];
  queryFn: () => R | Promise<undefined>;
  enabled: boolean;
} {
  return (...args: A) => {
    const api = useApi();
    return {
      queryKey: config.key(...args).filter((v) => v !== undefined),
      queryFn: () =>
        args.some((arg) => arg === undefined)
          ? Promise.resolve(undefined)
          : config.fetcher(api, ...(args as any)),
      enabled: !args.some((arg) => arg === undefined),
    };
  };
}

type RequiredTuple<T extends any[]> = {
  [K in keyof T]: NotUndefined<T[K]>;
};

type NotUndefined<T> = T extends undefined ? never : T;
