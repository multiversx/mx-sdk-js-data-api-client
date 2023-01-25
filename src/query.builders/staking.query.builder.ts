import { DataApiBaseQueryBuilder, DataApiFirstLastOrAggregateQueryBuilder } from './internal';

export class DataApiStakingQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'staking', args: [] });
  }

  public totalValue(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'total', args: [], hasQuery: false });
    this.addToPath({ name: 'value', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public lockedAmount(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'lockedAmount', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public lockedAmount24h(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'lockedAmount24h', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }
}
