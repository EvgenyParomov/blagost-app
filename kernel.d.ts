declare type Brand<T, B extends string> = T & { readonly _brand: B };

// Ids
declare type Id = Brand<string, string>;
declare type FestivalId = Brand<string, 'FestivalId'>;
declare type ScheduleId = Brand<string, 'ScheduleId'>;
declare type DayId = Brand<string, 'DayId'>;
declare type TimeSectionId = Brand<string, 'TimeSectionId'>;
declare type AdditionalTimeId = Brand<string, 'TimeSectionId'>;
declare type EventId = Brand<string, 'EventId'>;
declare type LectorId = Brand<string, 'LectorId'>;
declare type PlaceId = Brand<string, 'PlaceId'>;
declare type FileName = Brand<string, 'FileName'>;
declare type FileId = Brand<string, 'FileId'>;
declare type FileRelationId = Brand<string, 'FileRelationId'>;
declare type LinkId = Brand<string, 'LinkId'>;
// literals
declare type Email = string;
declare type StringPassword = string;

//unions
declare type TimeSectionType = 'many' | 'one' | 'empty';
