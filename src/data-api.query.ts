export enum DataApiQueryType {
  LAST = 'LAST',
  AGGREGATE = 'AGGREGATE',
  HISTORICAL = 'HISTORICAL',
}

export class DataApiQuery {
  public readonly query: string;
  public readonly variables: any;
  public readonly responsePath: string[];
  public readonly type: DataApiQueryType;

  constructor(query: string, variables: any, responsePath: string[], type: DataApiQueryType) {
    this.query = query;
    this.variables = variables;
    this.responsePath = responsePath;
    this.type = type;
  }

  public toJson(): any {
    return {
      query: this.query,
      variables: this.variables,
    };
  }
}
