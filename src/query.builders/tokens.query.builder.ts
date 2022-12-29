import { DataApiBaseQueryBuilder, DataApiLastOrAggregateQueryBuilder } from './internal';

export class DataApiTokensQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'tokens', args: [] });
  }

  public dailyNumberOfTokenTransfers(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'dailyNumberOfTokenTransfers', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }
}
