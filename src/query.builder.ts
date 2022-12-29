import { DataApiBaseQuery } from './queries';
import {
  DataApiAccountsQueryBuilder,
  DataApiContractsQueryBuilder,
  DataApiNetworkQueryBuilder,
  DataApiNFTsQueryBuilder,
  DataApiStakingQueryBuilder,
  DataApiTokensQueryBuilder,
  DataApiTransactionsQueryBuilder,
  DataApiXExchangeAnalyticsQueryBuilder,
} from './query.builders';


export class DataApiQueryBuilder extends DataApiBaseQuery {
  static createAccountsQuery(): DataApiAccountsQueryBuilder {
    return new DataApiAccountsQueryBuilder();
  }

  static createContractsQuery(): DataApiContractsQueryBuilder {
    return new DataApiContractsQueryBuilder();
  }

  static createNetworkQuery(): DataApiNetworkQueryBuilder {
    return new DataApiNetworkQueryBuilder();
  }

  static createNFTsQuery(): DataApiNFTsQueryBuilder {
    return new DataApiNFTsQueryBuilder();
  }

  static createStakingQuery(): DataApiStakingQueryBuilder {
    return new DataApiStakingQueryBuilder();
  }

  static createTokensQuery(): DataApiTokensQueryBuilder {
    return new DataApiTokensQueryBuilder();
  }

  static createTransactionsQuery(): DataApiTransactionsQueryBuilder {
    return new DataApiTransactionsQueryBuilder();
  }

  static createXExchangeAnalyticsQuery(): DataApiXExchangeAnalyticsQueryBuilder {
    return new DataApiXExchangeAnalyticsQueryBuilder();
  }
}
