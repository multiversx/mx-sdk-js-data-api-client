import { DataApiBaseQueryBuilder, DataApiLastOrAggregateQueryBuilder } from './internal';

export class DataApiQuotesQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'quotes', args: [] });
  }

  public historicalPrice(identifier: string): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({
      name: 'historical',
      args: [
        { name: 'identifier', type: 'String!', value: identifier },
      ],
      hasQuery: false,
    });
    this.addToPath({ name: 'price', args: [], hasQuery: true });

    return new DataApiLastOrAggregateQueryBuilder(this);
  }
}
