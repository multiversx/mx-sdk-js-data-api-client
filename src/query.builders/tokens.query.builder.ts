import { DataApiBaseQueryBuilder, DataApiFirstLastOrAggregateQueryBuilder } from './internal';

export class DataApiTokensQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'tokens', args: [] });
  }

  public dailyNumberOfTokenTransfers(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'dailyNumberOfTokenTransfers', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }
}
