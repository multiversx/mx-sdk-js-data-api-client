import { DataApiAccountsQuery } from './queries';
import { DataApiBaseQuery } from './queries/base';

export class DataApiQueryBuilder extends DataApiBaseQuery {
  static createAccountsQuery(): DataApiAccountsQuery {
    return new DataApiAccountsQuery();
  }
}
