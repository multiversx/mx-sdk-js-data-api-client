import { DataApiBaseQueryBuilder, DataApiLastOrAggregateQueryBuilder } from './internal';

export class DataApiContractsQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'contracts', args: [] });
  }

  public count(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'count', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public count24h(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'count24h', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }
}
