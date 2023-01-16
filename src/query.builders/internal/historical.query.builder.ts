import { DataApiQueryType, FillDataGapsOptions } from '../../entities';
import { DataApiHistoricalQuery } from '../../queries';
import { HistoricalValue } from '../../values';
import { DataApiBaseQueryBuilder } from './base.query.builder';

export class DataApiHistoricalQueryBuilder extends DataApiBaseQueryBuilder {
  constructor(query: DataApiBaseQueryBuilder) {
    super();
    this.copyProps(query);
  }

  public fillDataGaps(options?: FillDataGapsOptions): DataApiHistoricalQueryBuilder {
    this.addOption('fill_data_gaps', true);

    if(options?.skipFirstNullValues) {
      this.addOption('fill_data_gaps_skip_null_values', true);
    }

    return this;
  }

  public getHistorical(...values: HistoricalValue[]): DataApiHistoricalQuery {
    this.addValues(...values);
    return this.buildQuery(DataApiQueryType.HISTORICAL);
  }
}
