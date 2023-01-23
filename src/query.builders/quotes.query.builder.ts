import { DataApiBaseQueryBuilder, DataApiFirstLastOrAggregateQueryBuilder, DataApiLatestQuoteQueryBuilder } from './internal';

export class DataApiQuotesQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'quotes', args: [] });
  }

  public historicalPrice(identifier: string): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({
      name: 'historical',
      args: [
        { name: 'identifier', type: 'String!', value: identifier },
      ],
      hasQuery: false,
    });
    this.addToPath({ name: 'price', args: [], hasQuery: true });

    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public latest(identifier: string): DataApiLatestQuoteQueryBuilder {
    this.addToPath({
      name: 'latest',
      args: [
        { name: 'identifier', type: 'String!', value: identifier },
      ],
      hasQuery: false,
    });

    return new DataApiLatestQuoteQueryBuilder(this);
  }
}
