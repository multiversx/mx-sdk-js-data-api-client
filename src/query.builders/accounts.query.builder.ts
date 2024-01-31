import { BalanceFilter } from '../entities';
import { DataApiBaseQueryBuilder, DataApiFirstLastOrAggregateQueryBuilder } from './internal';

export class DataApiAccountsQueryBuilder extends DataApiBaseQueryBuilder {
  constructor() {
    super();
    this.addToPath({ name: 'accounts', args: [] });
  }

  public count(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'count', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public count24h(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'count24h', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public countWithBalance(filter: BalanceFilter): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'balance', args: [], hasQuery: false });
    this.addToPath({ name: `count_${filter}`, args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public dailyNumberOfActiveAccounts(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'dailyNumberOfActiveAccounts', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public dailyNumberOfActiveSenderAndReceiverAccounts(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'dailyNumberOfActiveSenderAndReceiverAccounts', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public activeAccounts24h(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'activeAccounts24h', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }

  public activeSenderAndReceiverAccounts24h(): DataApiFirstLastOrAggregateQueryBuilder {
    this.addToPath({ name: 'activeSenderAndReceiverAccounts24h', args: [], hasQuery: true });
    return new DataApiFirstLastOrAggregateQueryBuilder(this);
  }
}
