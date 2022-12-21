import { DataApiQuery, DataApiQueryType } from '../../data-api.query';
import { AggregateValue } from '../../data-api.values';
import { TimeResolution } from '../../entities';
import { DataApiBaseQuery } from './data-api.base.query';
import { DataApiHistoricalQuery } from './data-api.historical.query';

export class DataApiAggregateOrHistoricalQuery extends DataApiBaseQuery {
  constructor(query: DataApiBaseQuery) {
    super();
    this.copyProps(query);
  }

  public getAggregate(...values: AggregateValue[]): DataApiQuery {
    this.addValues(...values);
    return this.buildQuery(DataApiQueryType.AGGREGATE);
  }

  public withTimeResolution(resolution: TimeResolution): DataApiHistoricalQuery {
    this.addOption('resolution', resolution);
    return new DataApiHistoricalQuery(this);
  }
}
