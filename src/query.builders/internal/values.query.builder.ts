import { DataApiQueryType, TimeRange } from '../../entities';
import { DataApiLastQuery } from '../../queries';
import { HistoricalValue } from '../../values';
import { DataApiAggregateOrHistoricalQueryBuilder } from './aggregate.or.historical.query.builder';
import { DataApiBaseQueryBuilder } from './base.query.builder';

export class DataApiValuesQueryBuilder extends DataApiBaseQueryBuilder {
  constructor(query: DataApiBaseQueryBuilder) {
    super();
    this.copyProps(query);
  }

  public getLast(): DataApiLastQuery {
    this.addValues(HistoricalValue.last, HistoricalValue.time);
    return this.buildQuery(DataApiQueryType.LAST);
  }

  public withTimeRange(range: TimeRange): DataApiAggregateOrHistoricalQueryBuilder {
    this.addOption('range', range);
    return new DataApiAggregateOrHistoricalQueryBuilder(this);
  }

  public fromDate(date: Date): DataApiAggregateOrHistoricalQueryBuilder {
    this.addOption('date', date);
    return new DataApiAggregateOrHistoricalQueryBuilder(this);
  }

  public betweenDates(startDate: Date, endDate?: Date): DataApiAggregateOrHistoricalQueryBuilder {
    this.addOption('start_date', startDate);
    this.addOption('end_date', endDate);
    return new DataApiAggregateOrHistoricalQueryBuilder(this);
  }
}
