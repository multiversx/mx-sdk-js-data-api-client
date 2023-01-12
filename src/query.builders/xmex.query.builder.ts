import { DataApiBaseQueryBuilder, DataApiLastOrAggregateQueryBuilder } from './internal';

export class DataApiXMEXQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'xmex', args: [] });
  }

  public unlockEarlyCount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'unlockEarly', args: [] });
    this.addToPath({ name: 'count', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public unlockEarlyTotalAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'unlockEarly', args: [] });
    this.addToPath({ name: 'totalAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public unlockEarlyUnlockableAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'unlockEarly', args: [] });
    this.addToPath({ name: 'unlockableAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public unlockEarlyToBeBurnedAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'unlockEarly', args: [] });
    this.addToPath({ name: 'toBeBurnedAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public unlockAssetsCount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'unlockAssets', args: [] });
    this.addToPath({ name: 'count', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public unlockAssetsTotalAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'unlockAssets', args: [] });
    this.addToPath({ name: 'totalAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public unlockAssetsTotalUnlockedAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({name: 'unlockAssets', args: []});
    this.addToPath({name: 'totalUnlockedAmount', args: [], hasQuery: true});
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public reduceLockPeriodCount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'reduceLockPeriod', args: [] });
    this.addToPath({ name: 'count', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public reduceLockPeriodTotalAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'reduceLockPeriod', args: [] });
    this.addToPath({ name: 'totalAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public reduceLockPeriodBurnedAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'reduceLockPeriod', args: [] });
    this.addToPath({ name: 'burnedAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public reduceLockPeriodReducedAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'reduceLockPeriod', args: [] });
    this.addToPath({ name: 'reducedAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public lockTokensCount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'lockTokens', args: [] });
    this.addToPath({ name: 'count', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public lockTokensTotalAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'lockTokens', args: [] });
    this.addToPath({ name: 'totalAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public lockTokensExtendedAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'lockTokens', args: [] });
    this.addToPath({ name: 'extendedAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public migrateOldTokensCount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'migrateOldTokens', args: [] });
    this.addToPath({ name: 'count', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public migrateOldTokensTotalAmount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'migrateOldTokens', args: [] });
    this.addToPath({ name: 'totalAmount', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }
  
  public lkmexCount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'LKMEX', args: [] });
    this.addToPath({ name: 'count', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }
  
  public lkmexTotalSupply(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'LKMEX', args: [] });
    this.addToPath({ name: 'totalSupply', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public xmexCount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'XMEX', args: [] });
    this.addToPath({ name: 'count', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }
  
  public xmexTotalSupply(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'XMEX', args: [] });
    this.addToPath({ name: 'totalSupply', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }
}
