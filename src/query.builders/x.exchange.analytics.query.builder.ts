import { DataApiBaseQueryBuilder, DataApiLastOrAggregateQueryBuilder } from './internal';

export class DataApiXExchangeAnalyticsQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'xExchangeAnalytics', args: [] });
  }

  public metric(series: string, key: string): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({
      name: 'metric',
      args: [
        { name: 'series', type: 'String!', value: series },
        { name: 'key', type: 'String!', value: key },
      ],
      hasQuery: true,
    });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }
}
