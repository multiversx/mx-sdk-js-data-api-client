import { DataApiQueryType, TimeRange } from '../../entities';
import { DataApiValueQuery } from '../../queries';
import { HistoricalValue } from '../../values';
import { DataApiAggregateOrHistoricalQueryBuilder } from './aggregate.or.historical.query.builder';
import { DataApiBaseQueryBuilder } from './base.query.builder';

export class DataApiFirstLastOrAggregateQueryBuilder extends DataApiBaseQueryBuilder {
  constructor(query: DataApiBaseQueryBuilder) {
    super();
    this.copyProps(query);
  }

  public getLast(): DataApiValueQuery {
    this.addValues(HistoricalValue.last, HistoricalValue.time);
    return this.buildQuery(DataApiQueryType.FIRST_OR_LAST);
  }

  public getFirst(): DataApiValueQuery {
    this.addValues(HistoricalValue.first, HistoricalValue.time);
    return this.buildQuery(DataApiQueryType.FIRST_OR_LAST);
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
