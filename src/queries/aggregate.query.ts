import { DataApiBaseQuery } from './base.query';
import { DataApiQueryType } from '../entities';

export class DataApiAggregateQuery extends DataApiBaseQuery {
  constructor(query: string, variables: any, responsePath: string[]) {
    super(DataApiQueryType.AGGREGATE, query, variables, responsePath);
  }
}
