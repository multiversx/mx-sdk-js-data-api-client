import { DataApiQueryType, TimeResolution } from '../../entities';
import { DataApiAggregateQuery } from '../../queries';
import { AggregateValue } from '../../values';
import { DataApiBaseQueryBuilder } from './base.query.builder';
import { DataApiHistoricalQueryBuilder } from './historical.query.builder';

export class DataApiAggregateOrHistoricalQueryBuilder extends DataApiBaseQueryBuilder {
  constructor(query: DataApiBaseQueryBuilder) {
    super();
    this.copyProps(query);
  }

  public getAggregate(...values: AggregateValue[]): DataApiAggregateQuery {
    this.addValues(...values);
    return this.buildQuery(DataApiQueryType.AGGREGATE);
  }

  public withTimeResolution(resolution: TimeResolution): DataApiHistoricalQueryBuilder {
    this.addOption('resolution', resolution);
    return new DataApiHistoricalQueryBuilder(this);
  }
}
