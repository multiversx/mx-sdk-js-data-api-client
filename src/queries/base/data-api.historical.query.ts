import { DataApiQuery } from '../../data-api.query';
import { HistoricalValue } from '../../data-api.values';
import { DataApiBaseQuery } from './data-api.base.query';

export class DataApiHistoricalQuery extends DataApiBaseQuery {
  constructor(query: DataApiBaseQuery) {
    super();
    this.copyProps(query);
  }

  public fillDataGaps(): DataApiHistoricalQuery {
    this.addOption('fill_data_gaps', true);
    return this;
  }

  public getHistorical(...values: HistoricalValue[]): DataApiQuery {
    this.addValues(...values);
    return this.buildQuery();
  }
}
