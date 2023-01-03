import { DataApiBaseQueryBuilder, DataApiLastOrAggregateQueryBuilder } from './internal';

export class DataApiTransactionsQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'transactions', args: [] });
  }

  public dailyFeesCaptured(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'dailyFeesCaptured', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }
}
