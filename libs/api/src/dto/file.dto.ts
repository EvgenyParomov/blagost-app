type Relation = {
  fileName: FileName;
  entityId: Id;
};

export type CreateRelationsDto = {
  relations: Relation[];
};

export type FileDto = {
  name: FileName;
  mimetype: string;
  create: string;
};
