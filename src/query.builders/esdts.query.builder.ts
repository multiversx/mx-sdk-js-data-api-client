import { EsdtType } from '../entities';
import { DataApiBaseQueryBuilder, DataApiFirstLastOrAggregateQueryBuilder } from './internal';

export class DataApiESDTsQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'esdts', args: [] });
  }

  public count(esdtType: EsdtType): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({
      name: 'count',
      args: [
        { name: 'type', type: 'EsdtType!', value: esdtType },
      ],
      hasQuery: true,
    });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public count24h(esdtType: EsdtType): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({
      name: 'count24h',
      args: [
        { name: 'type', type: 'EsdtType!', value: esdtType },
      ],
      hasQuery: true,
    });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }
}
