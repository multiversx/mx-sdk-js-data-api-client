import { DataApiBaseQuery } from './base.query';
import { DataApiQueryType } from '../entities';

export class DataApiPortfolioQuery extends DataApiBaseQuery {
  constructor(query: string, variables: any, responsePath: string[]) {
    super(DataApiQueryType.PORTFOLIO, query, variables, responsePath);
  }
}
