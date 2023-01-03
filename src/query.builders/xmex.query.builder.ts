import { DataApiBaseQueryBuilder, DataApiLastOrAggregateQueryBuilder } from './internal';

export class DataApiXMEXQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'xmex', args: [] });
  }

  public unlockEarlyCount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'count', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public unlockEarlyTotalAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'totalAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public unlockEarlyUnlockableAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'unlockableAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public unlockEarlyToBeBurnedAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'toBeBurnedAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public reduceLockPeriodCount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'count', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public reduceLockPeriodTotalAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'totalAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public reduceLockPeriodBurnedAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'burnedAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public reduceLockPeriodReducedAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'reducedAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }
}
