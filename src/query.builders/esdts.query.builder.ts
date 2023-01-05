import { EsdtType } from '../entities';
import { DataApiBaseQueryBuilder, DataApiLastOrAggregateQueryBuilder } from './internal';

export class DataApiESDTsQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'esdts', args: [] });
  }

  public count(esdtType: EsdtType): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({
      name: 'count',
      args: [
        { name: 'type', type: 'EsdtType!', value: esdtType },
      ],
      hasQuery: true,
    });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public count24h(esdtType: EsdtType): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({
      name: 'count24h',
      args: [
        { name: 'type', type: 'EsdtType!', value: esdtType },
      ],
      hasQuery: true,
    });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }
}
