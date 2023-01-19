import { DataApiBaseQueryBuilder, DataApiFirstLastOrAggregateQueryBuilder } from './internal';

export class DataApiTransfersQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'transfers', args: [] });
  }

  public addressToAddress(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'addressToAddress', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public addressToContract(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'addressToContract', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public contractToAddress(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'contractToAddress', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public contractToContract(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'contractToContract', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }
}
