import { DataApiBaseQuery } from './base.query';
import { DataApiQueryType } from '../entities';

export class DataApiTradingPairsQuery extends DataApiBaseQuery {
  constructor(query: string, variables: any, responsePath: string[]) {
    super(DataApiQueryType.TRADING_PAIRS, query, variables, responsePath);
  }
}
