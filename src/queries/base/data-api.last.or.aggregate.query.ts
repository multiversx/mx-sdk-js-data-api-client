import { DataApiQuery, DataApiQueryType } from '../../data-api.query';
import { HistoricalValue } from '../../data-api.values';
import { TimeRange } from '../../entities';
import { DataApiAggregateOrHistoricalQuery } from './data-api.aggregate.or.historical.query';
import { DataApiBaseQuery } from './data-api.base.query';

export class DataApiLastOrAggregateQuery extends DataApiBaseQuery {
  constructor(query: DataApiBaseQuery) {
    super();
    this.copyProps(query);
  }

  public getLast(): DataApiQuery {
    this.addValues(HistoricalValue.last, HistoricalValue.time);
    return this.buildQuery(DataApiQueryType.LAST);
  }

  public withTimeRange(range: TimeRange): DataApiAggregateOrHistoricalQuery {
    this.addOption('range', range);
    return new DataApiAggregateOrHistoricalQuery(this);
  }

  public fromDate(date: Date): DataApiAggregateOrHistoricalQuery {
    this.addOption('date', date);
    return new DataApiAggregateOrHistoricalQuery(this);
  }

  public betweenDates(startDate: Date, endDate?: Date): DataApiAggregateOrHistoricalQuery {
    this.addOption('start_date', startDate);
    this.addOption('end_date', endDate);
    return new DataApiAggregateOrHistoricalQuery(this);
  }
}
