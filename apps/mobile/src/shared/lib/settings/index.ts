import { join } from 'path';
import { Dto } from '@blagost/api';
import { useQuery } from 'react-query';
import { useSettings } from './queries';
import { replaceLocalHost } from '../native-std';

const useSetting = <T extends keyof Dto.MobileSettings>(
  key: T
): Dto.MobileSettings[T] => {
  const { data: value } = useQuery({
    ...useSettings(),
    select: (value) => value[key],
  });

  if (!value) throw new Error(`Bad configuration error. Key ${key} not found`);

  return value;
};

export const useFetchSettings = () => {
  const { isFetched, data } = useQuery({
    ...useSettings(),
  });
  return { isFetched };
};

export const useGetFileUrl = () => {
  const baseUrl = useSetting('FILES_BASE_URL');
  function getUrl<T extends string>(url: T): string;
  function getUrl<T extends string>(url: T | undefined): string | undefined;
  function getUrl<T extends string>(url: T | undefined): string | undefined {
    return url
      ? replaceLocalHost(join(baseUrl, encodeURIComponent(url)))
      : undefined;
  }

  return getUrl;
};
