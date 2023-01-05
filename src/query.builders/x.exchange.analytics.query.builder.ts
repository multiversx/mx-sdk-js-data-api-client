import { DataApiBaseQueryBuilder, DataApiLastOrAggregateQueryBuilder, DataApiValuesQueryBuilder } from './internal';

export class DataApiXExchangeAnalyticsQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'maiar_exchange_analytics', args: [] });
  }

  public metric(series: string, metric: string): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({
      name: 'metric',
      args: [
        { name: 'series', type: 'String!', value: series },
        { name: 'metric', type: 'String!', value: metric },
      ],
      hasQuery: true,
    });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public values(series: string, metric: string): DataApiValuesQueryBuilder {
    this.addToPath({
      name: 'values',
      args: [
        { name: 'series', type: 'String!', value: series },
        { name: 'metric', type: 'String!', value: metric },
      ],
      hasQuery: true,
    });
    return new DataApiValuesQueryBuilder(this);
  }
}
