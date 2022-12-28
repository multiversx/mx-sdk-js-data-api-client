import { DataApiBaseQuery } from './queries';
import { DataApiAccountsQueryBuilder, DataApiXExchangeAnalyticsQueryBuilder } from './query.builders';


export class DataApiQueryBuilder extends DataApiBaseQuery {
  static createAccountsQuery(): DataApiAccountsQueryBuilder {
    return new DataApiAccountsQueryBuilder();
  }

  static createXExchangeAnalyticsQuery(): DataApiXExchangeAnalyticsQueryBuilder {
    return new DataApiXExchangeAnalyticsQueryBuilder();
  }
}
