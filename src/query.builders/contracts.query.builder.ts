import moment from 'moment';
import { DataApiBaseQueryBuilder, DataApiFirstLastOrAggregateQueryBuilder, DataApiMostUsedQueryBuilder } from './internal';

export class DataApiContractsQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'contracts', args: [] });
  }

  public count(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'count', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public count24h(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'count24h', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public dailyMostUsed(top: number, date: Date): DataApiMostUsedQueryBuilder {
    this.addToPath({
      name: 'dailyMostUsed',
      args: [
        { name: 'top', type: 'Int!', value: top },
        { name: 'date', type: 'DateTime', value: moment(date).format('yyyy-MM-DD HH:mm:ss') },
      ],
      hasQuery: false,
    });
    return new DataApiMostUsedQueryBuilder(this);
  }
}
