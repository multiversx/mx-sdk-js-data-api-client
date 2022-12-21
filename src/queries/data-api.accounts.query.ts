import { DataApiBaseQuery, DataApiLastOrAggregateQuery } from './base';

export class DataApiAccountsQuery extends DataApiBaseQuery {
  constructor() {
    super();
    this.addToPath({ name: 'accounts', args: [] });
  }

  public count(): DataApiLastOrAggregateQuery {
    this.addToPath({
      name: 'count',
      args: [],
      hasQuery: true,
    });
    return new DataApiLastOrAggregateQuery(this);
  }

  public count24h(): DataApiLastOrAggregateQuery {
    this.addToPath({
      name: 'count24h',
      args: [],
      hasQuery: true,
    });    return new DataApiLastOrAggregateQuery(this);
  }
}
