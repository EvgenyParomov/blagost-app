import { DateTime, Duration } from 'luxon';

export namespace CellParsers {
  export const parseTime = (str: string) => {
    return Duration.fromISOTime(str.padStart(5, '0'));
  };
  export const parseTimeOpt = (str: string) =>
    !str ? undefined : Duration.fromISOTime(str.padStart(5, '0'));
  export const parseDate = (str: string) =>
    DateTime.fromFormat(str, 'dd.MM.yyyy');
  export const parseStr = (str: string) => str.trim();

  export const parseStrOpt = (str: string) =>
    !str ? undefined : parseStr(str);

  export const parseStrArray = (str: string) =>
    !str ? [] : str.split('\n').map(parseStr);

  export const parseBrandString =
    <T extends Brand<string, string>>() =>
    (str: string) =>
      parseStr(str) as T;

  export const parseBrandStringOpt =
    <T extends Brand<string, string>>() =>
    (str: string) =>
      !str ? undefined : parseBrandString<T>()(str);

  export const parseBrandStringArray =
    <T extends Brand<string, string>>() =>
    (str: string) =>
      !str ? [] : str.split('\n').map(parseBrandString<T>());

  export const parseLinks = (str: string) => {
    if (!str) return [];
    return str
      .split('\n')
      .map(parseStr)
      .map((linkStr) => {
        const [, label, href] = linkStr.match(/\[(.*)\]\((.*)\)/) ?? [
          '',
          '',
          '',
        ];
        return {
          label,
          href,
        };
      });
  };
}
