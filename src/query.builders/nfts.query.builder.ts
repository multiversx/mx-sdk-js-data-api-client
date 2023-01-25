import { DataApiBaseQueryBuilder, DataApiFirstLastOrAggregateQueryBuilder, DataApiMostUsedQueryBuilder } from './internal';

export class DataApiNFTsQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'nfts', args: [] });
  }

  public count(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'count', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public count24h(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'count24h', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public dailyMostUsed(top: number): DataApiMostUsedQueryBuilder {
    this.addToPath({
      name: 'dailyMostUsed',
      args: [
        { name: 'top', type: 'Int!', value: top },
      ],
      hasQuery: true,
    });
    return new DataApiMostUsedQueryBuilder(this);
  }
}
