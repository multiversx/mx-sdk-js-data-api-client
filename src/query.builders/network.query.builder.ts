import { DataApiBaseQueryBuilder, DataApiLastOrAggregateQueryBuilder } from './internal';

export class DataApiNetworkQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'network', args: [] });
  }

  public blocksCount(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'blocks', args: [] });
    this.addToPath({ name: 'count', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public blocksCount24h(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'blocks', args: [] });
    this.addToPath({ name: 'count24h', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public developerRewards(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'developer', args: [] });
    this.addToPath({ name: 'rewards', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public inflation(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'economics', args: [] });
    this.addToPath({ name: 'inflation', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public APR(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'economics', args: [] });
    this.addToPath({ name: 'APR', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public baseAPR(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'economics', args: [] });
    this.addToPath({ name: 'baseAPR', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public topUpAPR(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'economics', args: [] });
    this.addToPath({ name: 'topUpAPR', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }
}
