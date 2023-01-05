import { DataApiBaseQueryBuilder, DataApiLastOrAggregateQueryBuilder } from './internal';

export class DataApiXExchangeAnalyticsQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'xExchangeAnalytics', args: [] });
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
}
