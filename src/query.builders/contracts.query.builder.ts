import { DataApiBaseQueryBuilder, DataApiFirstLastOrAggregateQueryBuilder, DataApiMostUsedQueryBuilder } from './internal';

export class DataApiContractsQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'contracts', args: [] });
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

  public mostUsed24h(top: number, onlyVerified: boolean = false): DataApiMostUsedQueryBuilder {
    this.addToPath({
      name: 'mostUsed24h',
      args: [
        { name: 'top', type: 'Int!', value: top },
        { name: 'onlyVerified', type: 'Boolean', value: onlyVerified },
      ],
      hasQuery: false,
    });
    return new DataApiMostUsedQueryBuilder(this);
  }
}
