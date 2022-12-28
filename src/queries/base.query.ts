import { DataApiQueryType } from '../entities';

export class DataApiBaseQuery {
  public readonly type: DataApiQueryType;
  public readonly query: string;
  public readonly variables: any;
  public readonly responsePath: string[];

  constructor(type: DataApiQueryType, query: string, variables: any, responsePath: string[]) {
    this.type = type;
    this.query = query;
    this.variables = variables;
    this.responsePath = responsePath;
  }

  public toJson(): { query: string, variables: Record<string, any> } {
    return {
      query: this.query,
      variables: this.variables,
    };
  }
}

