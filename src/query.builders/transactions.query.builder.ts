import { DataApiBaseQueryBuilder, DataApiFirstLastOrAggregateQueryBuilder } from './internal';

export class DataApiTransactionsQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'transactions', args: [] });
  }

  public dailyFeesCaptured(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'dailyFeesCaptured', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }
}
