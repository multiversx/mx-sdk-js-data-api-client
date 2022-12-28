import { DataApiBaseQueryBuilder, DataApiLastOrAggregateQueryBuilder } from './internal';

export class DataApiAccountsQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'accounts', args: [] });
  }

  public count(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({
      name: 'count',
      args: [],
      hasQuery: true,
    });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public count24h(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({
      name: 'count24h',
      args: [],
      hasQuery: true,
    });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }
}
