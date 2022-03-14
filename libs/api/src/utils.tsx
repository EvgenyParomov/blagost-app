import { AxiosResponse } from 'axios';

export function getRes<T>(res: AxiosResponse<T>) {
  return res.data;
}
