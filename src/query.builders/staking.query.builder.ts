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

  public totalUsers(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'total', args: [], hasQuery: false });
    this.addToPath({ name: 'users', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }
  
  public activeValue(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'staking', args: [], hasQuery: false });
    this.addToPath({ name: 'value', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public activeUsers(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'staking', args: [], hasQuery: false });
    this.addToPath({ name: 'users', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public legacyDelegationValue(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'legacy_delegation', args: [], hasQuery: false });
    this.addToPath({ name: 'value', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public legacyDelegationUsers(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'legacy_delegation', args: [], hasQuery: false });
    this.addToPath({ name: 'users', args: [], hasQuery: true });
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
