import { DataApiBaseQueryBuilder, DataApiFirstLastOrAggregateQueryBuilder } from './internal';

export class DataApiNetworkQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'network', args: [] });
  }

  public blocksCount(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'blocks', args: [] });
    this.addToPath({ name: 'count', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public blocksCount24h(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'blocks', args: [] });
    this.addToPath({ name: 'count24h', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public developerRewards(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'developer', args: [] });
    this.addToPath({ name: 'rewards', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public inflation(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'economics', args: [] });
    this.addToPath({ name: 'inflation', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public APR(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'economics', args: [] });
    this.addToPath({ name: 'APR', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public baseAPR(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'economics', args: [] });
    this.addToPath({ name: 'baseAPR', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public topUpAPR(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'economics', args: [] });
    this.addToPath({ name: 'topUpAPR', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }
}
