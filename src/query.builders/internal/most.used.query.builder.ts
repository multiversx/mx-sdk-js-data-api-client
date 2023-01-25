import { DataApiQueryType } from '../../entities';
import { DataApiMostUsedQuery } from '../../queries';
import { MostUsedValue } from '../../values';
import { DataApiBaseQueryBuilder } from './base.query.builder';

export class DataApiMostUsedQueryBuilder extends DataApiBaseQueryBuilder {
  constructor(query: DataApiBaseQueryBuilder) {
    super();
    this.copyProps(query);
  }

  public fromDate(date: Date): DataApiMostUsedQueryBuilder {
    this.addOption('date', date);
    return this;
  }

  public getValues(): DataApiMostUsedQuery {
    this.addValues(MostUsedValue.rank, MostUsedValue.key, MostUsedValue.value);
    return this.buildQuery(DataApiQueryType.MOST_USED);
  }
}
