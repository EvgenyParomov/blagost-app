export type RelationDto = {
  fileName: FileName;
  entityId: Id;
};

export type UpdateEntityRelations = {
  entityId: Id;
  files: FileName[];
};

export type CreateRelationsDto = {
  relations: RelationDto[];
};
export type RemoveRelationsDto = {
  relations: RelationDto[];
};

export type FileDto = {
  name: FileName;
  mimetype: string;
  create: string;
};
