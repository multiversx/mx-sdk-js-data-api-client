import { DataApiBaseQuery } from './base.query';
import { DataApiQueryType } from '../entities';

export class DataApiHistoricalQuery extends DataApiBaseQuery {
  constructor(query: string, variables: any, responsePath: string[]) {
    super(DataApiQueryType.HISTORICAL, query, variables, responsePath);
  }
}
