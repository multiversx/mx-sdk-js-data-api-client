import { DataApiBaseQueryBuilder, DataApiLastOrAggregateQueryBuilder } from './internal';

export class DataApiTransfersQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'transfers', args: [] });
  }

  public addressToAddress(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'addressToAddress', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public addressToContract(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'addressToContract', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public contractToAddress(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'contractToAddress', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }

  public contractToContract(): DataApiLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'contractToContract', args: [], hasQuery: true });
    return new DataApiLastOrAggregateQueryBuilder(this);
  }
}
