declare type Brand<T, B extends string> = T & { readonly _brand: B };

// Ids
declare type FestivalId = Brand<string, 'FestivalId'>;
declare type ScheduleId = Brand<string, 'ScheduleId'>;
declare type DayId = Brand<string, 'DayId'>;
declare type TimeSectionId = Brand<string, 'TimeSectionId'>;
declare type AdditionalTimeId = Brand<string, 'TimeSectionId'>;
declare type EventId = Brand<string, 'EventId'>;
declare type LectorId = Brand<string, 'LectorId'>;
declare type PlaceId = Brand<string, 'PlaceId'>;
// literals
declare type Email = string;
declare type StringPassword = string;
