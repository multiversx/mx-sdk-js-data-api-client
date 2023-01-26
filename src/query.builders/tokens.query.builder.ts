import { DataApiBaseQueryBuilder, DataApiFirstLastOrAggregateQueryBuilder, DataApiMostUsedQueryBuilder } from './internal';

export class DataApiTokensQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'tokens', args: [] });
  }

  public dailyNumberOfTokenTransfers(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'dailyNumberOfTokenTransfers', args: [], hasQuery: true });
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

  public mostUsed24h(top: number): DataApiMostUsedQueryBuilder {
    this.addToPath({
      name: 'mostUsed24h',
      args: [
        { name: 'top', type: 'Int!', value: top },
      ],
      hasQuery: true,
    });
    return new DataApiMostUsedQueryBuilder(this);
  }
}
