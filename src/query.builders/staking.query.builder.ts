import { DataApiBaseQueryBuilder, DataApiLastOrAggregateQueryBuilder } from './internal';

export class DataApiStakingQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'staking', args: [] });
  }

  public lockedAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'lockedAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public lockedAmount24h(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'lockedAmount24h', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }
}
