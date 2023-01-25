import { DataApiBaseQuery } from './base.query';
import { DataApiQueryType } from '../entities';

export class DataApiMostUsedQuery extends DataApiBaseQuery {
  constructor(query: string, variables: any, responsePath: string[]) {
    super(DataApiQueryType.MOST_USED, query, variables, responsePath);
  }
}
