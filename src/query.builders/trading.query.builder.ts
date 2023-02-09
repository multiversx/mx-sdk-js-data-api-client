import { DataApiBaseQueryBuilder, DataApiTradingPairsQueryBuilder } from './internal';

export class DataApiTradingQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'trading', args: [] });
  }

  public pairs(): DataApiTradingPairsQueryBuilder {
    this.addToPath({ name: 'pairs', args: [], hasQuery: false });

    return new DataApiTradingPairsQueryBuilder(this);
  }
}
